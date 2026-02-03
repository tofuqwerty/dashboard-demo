import mysql from 'mysql2/promise';

let pool: mysql.Pool | null = null;

export function getConnection() {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'login_app',
      port: parseInt(process.env.DB_PORT || '3306'),
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
  }
  return pool;
}

export async function query(sql: string, params?: any[]) {
  const connection = getConnection();
  const [results] = await connection.execute(sql, params);
  return results;
}