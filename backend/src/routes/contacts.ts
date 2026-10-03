import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import pool from '../config/db';

const router = Router();

// ─── 提交留言 POST /api/contacts ─────────────────────────────
router.post('/', [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('请输入姓名'),
  body('email').isEmail().normalizeEmail().withMessage('邮箱格式不正确'),
  body('phone').optional().trim(),
  body('message').trim().isLength({ min: 5, max: 2000 }).withMessage('留言内容5-2000字'),
  body('lang').optional().isIn(['TC', 'SC', 'EN', 'JP', 'KR']),
], async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  const { name, email, phone, message, lang = 'TC' } = req.body;

  try {
    await pool.execute(
      'INSERT INTO contacts (name, email, phone, message, lang) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone || null, message, lang]
    );

    // TODO: 发送邮件通知给管理员
    // sendAdminNotification({ name, email, phone, message });

    res.status(201).json({ success: true, message: '留言已发送，我们将尽快回复您' });
  } catch (err) {
    console.error('提交留言失败:', err);
    res.status(500).json({ success: false, message: '服务器错误，请稍后重试' });
  }
});

export default router;
