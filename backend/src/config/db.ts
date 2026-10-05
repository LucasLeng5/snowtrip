import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
  host:               process.env.DB_HOST     || 'localhost',
  port:               Number(process.env.DB_PORT) || 3306,
  user:               process.env.DB_USER     || 'root',
  password:           process.env.DB_PASSWORD || '',
  database:           process.env.DB_NAME     || 'snowtrip1005',
  waitForConnections: true,
  connectionLimit:    10,
  queueLimit:         0,
  charset:            'utf8mb4',
  timezone:           'local',  // 使用本地时区，与 MySQL NOW() 保持一致
});

pool.getConnection()
  .then(conn => {
    console.log('✅ MySQL 连接成功');
    conn.release();
  })
  .catch(err => {
    console.warn('⚠️ MySQL 连接失败（非数据库接口仍可正常工作）:', (err as Error).message);
  });

export default pool;
