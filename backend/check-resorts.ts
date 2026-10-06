import pool from './src/config/db.js';

async function checkResorts() {
  try {
    const [rows] = await pool.execute('SELECT id, name, location FROM resorts LIMIT 5') as any;
    console.log('前 5 条雪场记录:');
    rows.forEach((row: any) => {
      console.log(`ID: ${row.id}, 名称: ${row.name}, 地点: ${row.location}`);
    });
    
    // 检查是否有乱码
    const hasQuestionMarks = rows.some((row: any) => 
      row.name.includes('?') || row.location.includes('?')
    );
    console.log('\n是否有乱码:', hasQuestionMarks ? '❌ 是' : '✅ 否');
    
    process.exit(0);
  } catch (err: any) {
    console.error('错误:', err.message);
    process.exit(1);
  }
}

checkResorts();
