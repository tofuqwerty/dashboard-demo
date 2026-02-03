'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DarkModeToggle from '@/components/DarkModeToggle';

interface DashboardClientProps {
  user: {
    userId: number;
    email: string;
    username: string;
  };
}

export default function DashboardClient({ user }: DashboardClientProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <DarkModeToggle />
      
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {user.username.charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Selamat datang kembali!
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={loading}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Keluar...</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  <span>Logout</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* User Info Card */}
          <div className="card animate-fadeIn">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600 dark:text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Profil Pengguna
              </h2>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Username</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.username}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Email</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">User ID</p>
                <p className="font-medium text-gray-900 dark:text-white">
                  #{user.userId}
                </p>
              </div>
            </div>
          </div>

          {/* Stats Card 1 */}
          <div className="card animate-fadeIn" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600 dark:text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Status Login
              </h2>
            </div>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400">Aktif</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Sesi login Anda aktif dan terverifikasi
            </p>
          </div>

          {/* Stats Card 2 */}
          <div className="card animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600 dark:text-purple-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Keamanan
              </h2>
            </div>
            <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
              Aman
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Password ter-hash dengan bcrypt
            </p>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-8 card animate-fadeIn" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Informasi Sistem
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  JWT Authentication
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Token tersimpan dalam HttpOnly Cookie
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Rate Limiting
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maksimal 5 percobaan login per menit
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Protected Routes
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Halaman ini hanya bisa diakses dengan JWT valid
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <svg
                className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  Dark Mode
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Toggle tema terang/gelap tersedia
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}