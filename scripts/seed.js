const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: '.env.local' });

async function seedDatabase() {
  let connection;
  
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      port: parseInt(process.env.DB_PORT || '3306')
    });

    console.log('✅ Connected to MySQL');

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME || 'login_app'}`);
    console.log(`✅ Database '${process.env.DB_NAME || 'login_app'}' created/verified`);

    await connection.query(`USE ${process.env.DB_NAME || 'login_app'}`);

    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email),
        INDEX idx_username (username)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
    `);
    console.log('✅ Users table created/verified');

    const [existingUsers] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      ['demo@example.com']
    );

    if (existingUsers.length > 0) {
      console.log('ℹ️  Demo user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('demo123', 10);

      await connection.query(
        'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
        ['demo', 'demo@example.com', hashedPassword]
      );
      console.log('✅ Demo user created successfully');
      console.log('   Email: demo@example.com');
      console.log('   Password: demo123');
    }

    console.log('\n🎉 Database setup completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

seedDatabase();