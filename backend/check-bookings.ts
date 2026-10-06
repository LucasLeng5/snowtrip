import pool from './src/config/db.js';

async function checkBookings() {
  try {
    // 先检查表结构
    const [columns] = await pool.execute('SHOW COLUMNS FROM bookings') as any;
    console.log('bookings 表字段:');
    columns.forEach((col: any) => console.log(`  - ${col.Field} (${col.Type})`));
    
    // 查询最近订单（不包含 form_email）
    const [rows] = await pool.execute('SELECT id, order_no, user_id, user_email, status, created_at FROM bookings ORDER BY id DESC LIMIT 5') as any;
    console.log('\n最近 5 条订单:');
    console.log(JSON.stringify(rows, null, 2));
    
    process.exit(0);
  } catch (err: any) {
    console.error('错误:', err.message);
    process.exit(1);
  }
}

checkBookings();
