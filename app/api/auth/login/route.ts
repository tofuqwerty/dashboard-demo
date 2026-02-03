import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { query } from '@/lib/db';
import { createToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';
import { User, LoginRequest, LoginResponse } from '@/types';

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || 
                request.headers.get('x-real-ip') || 
                'unknown';

    const rateLimitResult = checkRateLimit(`login:${ip}`, 5, 60000);
    
    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Terlalu banyak percobaan login. Silakan coba lagi nanti.',
          retryAfter: Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': rateLimitResult.reset.toString()
          }
        }
      );
    }

    const body: LoginRequest = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email dan password harus diisi'
        },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Format email tidak valid'
        },
        { status: 400 }
      );
    }

    const users = await query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    ) as User[];

    if (users.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email atau password salah'
        },
        { status: 401 }
      );
    }

    const user = users[0];

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email atau password salah'
        },
        { status: 401 }
      );
    }

    const token = await createToken({
      userId: user.id,
      email: user.email,
      username: user.username
    });

    const response = NextResponse.json(
      {
        success: true,
        message: 'Login berhasil',
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      },
      { status: 200 }
    );

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 24 hours
      path: '/'
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Terjadi kesalahan server'
      },
      { status: 500 }
    );
  }
}