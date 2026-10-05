import { Router, Request, Response } from 'express';
import pool from '../config/db';

const router = Router();

// ─── 获取所有雪场 GET /api/resorts ───────────────────────────
router.get('/', async (req: Request, res: Response): Promise<void> => {
  const { nation, search, page = '1', limit = '20' } = req.query;
  const pageNum = Math.max(1, parseInt(String(page)) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(String(limit)) || 20));
  const offset = (pageNum - 1) * limitNum;

  try {
    let sql = 'SELECT * FROM resorts WHERE is_active = 1';
    const params: (string | number)[] = [];

    if (nation && ['JP', 'CN', 'NZ'].includes(nation as string)) {
      sql += ' AND nation = ?';
      params.push(nation as string);
    }
    if (search) {
      sql += ' AND (name LIKE ? OR name_en LIKE ? OR location LIKE ?)';
      const q = `%${search}%`;
      params.push(q, q, q);
    }

    sql += ` ORDER BY nation, price ASC LIMIT ${limitNum} OFFSET ${offset}`;

    const [rows] = await pool.execute(sql, params);
    const resorts = (rows as any[]).map(r => ({
      ...r,
      features: typeof r.features === 'string' ? JSON.parse(r.features) : r.features,
    }));

    // 总数
    let countSql = 'SELECT COUNT(*) as total FROM resorts WHERE is_active = 1';
    const countParams: (string | number)[] = [];
    if (nation) { countSql += ' AND nation = ?'; countParams.push(nation as string); }
    const [countRows] = await pool.execute(countSql, countParams);
    const total = (countRows as any[])[0].total;

    res.json({ success: true, data: resorts, pagination: { total, page: pageNum, limit: limitNum } });
  } catch (err) {
    console.error('获取雪场失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 获取单个雪场 GET /api/resorts/:id ───────────────────────
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM resorts WHERE id = ? AND is_active = 1',
      [req.params.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '雪场不存在' });
      return;
    }
    const resort = (rows as any[])[0];
    resort.features = typeof resort.features === 'string' ? JSON.parse(resort.features) : resort.features;
    res.json({ success: true, data: resort });
  } catch (err) {
    console.error('获取雪场详情失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
