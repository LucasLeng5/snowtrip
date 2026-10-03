import { Router, Request, Response } from 'express';
import pool from '../config/db';

const router = Router();

// ─── 获取所有教练 GET /api/coaches ───────────────────────────
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, name, title_tc, title_en, certifications, languages, experience, photo_url, resorts FROM coaches WHERE is_active = 1 ORDER BY experience DESC'
    );
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('获取教练失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 获取单个教练 GET /api/coaches/:id ───────────────────────
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM coaches WHERE id = ? AND is_active = 1',
      [req.params.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '教练不存在' });
      return;
    }
    res.json({ success: true, data: (rows as any[])[0] });
  } catch (err) {
    console.error('获取教练详情失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

export default router;
