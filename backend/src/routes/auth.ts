import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import pool from '../config/db';
import { sendMail } from '../config/mailer';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

// ─── 注册 POST /api/auth/register ────────────────────────────
router.post('/register', [
  body('nickname').trim().isLength({ min: 2, max: 50 }),
  body('email').isEmail().normalizeEmail(),
  body('phone').trim().isLength({ min: 8, max: 20 }),
  body('password').isLength({ min: 8 }),
], async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  const { nickname, email, phone, password, lang = 'TC' } = req.body;

  try {
    // 检查邮箱是否已注册
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ?', [email]);
    if ((existing as any[]).length > 0) {
      res.status(409).json({ success: false, message: '該郵箱已被註冊，請直接登入或使用其他郵箱' });
      return;
    }

    // 加密密码
    const hash = await bcrypt.hash(password, 12);

    // 生成邮箱验证 token
    const verifyToken = uuidv4();
    const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24小时

    // 写入数据库（is_verified = 0）
    const [result] = await pool.execute(
      'INSERT INTO users (nickname, email, phone, password_hash, lang, is_verified, reset_token, reset_expires) VALUES (?, ?, ?, ?, ?, 0, ?, ?)',
      [nickname, email, phone, hash, lang, verifyToken, verifyExpires]
    );
    const userId = (result as any).insertId;

    // 发送验证邮件
    const verifyUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${verifyToken}`;
    await sendMail(
      email,
      '【SnowTrip】請驗證您的電子郵箱',
      `您好 ${nickname}，\n\n請點擊以下連結驗證您的電子郵箱：\n${verifyUrl}\n\n連結將在24小時後失效。\n\nSnowTrip 團隊`,
      `
        <div style="font-family:sans-serif;max-width:500px;margin:auto;padding:32px">
          <h2 style="color:#0b1929">歡迎加入 SnowTrip 🎿</h2>
          <p>您好 <strong>${nickname}</strong>，</p>
          <p>請點擊下方按鈕完成郵箱驗證：</p>
          <a href="${verifyUrl}" style="display:inline-block;margin:16px 0;padding:12px 28px;background:#0ea5e9;color:white;text-decoration:none;border-radius:8px;font-weight:bold">
            驗證電子郵箱
          </a>
          <p style="color:#888;font-size:13px">連結將在 24 小時後失效。如非本人操作請忽略此郵件。</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
          <p style="color:#aaa;font-size:12px">SnowTrip International</p>
        </div>
      `
    );

    res.status(201).json({
      success: true,
      message: '註冊成功！驗證郵件已發送至您的郵箱，請點擊連結完成驗證後即可登入。',
      data: { userId, email }
    });
  } catch (err) {
    console.error('注册失败:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤，請稍後重試' });
  }
});

// ─── 验证邮箱 GET /api/auth/verify-email?token=xxx ───────────
router.get('/verify-email', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.query;
  if (!token) {
    res.status(400).json({ success: false, message: '驗證連結無效' });
    return;
  }
  try {
    const [rows] = await pool.execute(
      'SELECT id, nickname, email FROM users WHERE reset_token = ? AND reset_expires > NOW() AND is_verified = 0',
      [token as string]
    );
    if ((rows as any[]).length === 0) {
      res.status(400).json({ success: false, message: '驗證連結已失效或已被使用，請重新註冊或聯絡客服' });
      return;
    }
    const user = (rows as any[])[0];
    await pool.execute(
      'UPDATE users SET is_verified = 1, reset_token = NULL, reset_expires = NULL WHERE id = ?',
      [user.id]
    );
    res.json({ success: true, message: `郵箱驗證成功！歡迎 ${user.nickname}，現在可以登入了。`, data: { email: user.email } });
  } catch (err) {
    console.error('邮箱验证失败:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ─── 重发验证邮件 POST /api/auth/resend-verify ───────────────
router.post('/resend-verify', [
  body('email').isEmail().normalizeEmail(),
], async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const [rows] = await pool.execute(
      'SELECT id, nickname, is_verified FROM users WHERE email = ?', [email]
    );
    if ((rows as any[]).length === 0 || (rows as any[])[0].is_verified === 1) {
      res.json({ success: true, message: '如郵箱存在且未驗證，驗證郵件已重新發送' });
      return;
    }
    const user = (rows as any[])[0];
    const verifyToken = uuidv4();
    const verifyExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await pool.execute(
      'UPDATE users SET reset_token = ?, reset_expires = ? WHERE id = ?',
      [verifyToken, verifyExpires, user.id]
    );
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${verifyToken}`;
    await sendMail(email, '【SnowTrip】郵箱驗證連結（重新發送）',
      `驗證連結：${verifyUrl}（24小時內有效）`);
    res.json({ success: true, message: '驗證郵件已重新發送，請檢查您的郵箱' });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ─── 登录 POST /api/auth/login ────────────────────────────────
router.post('/login', [
  body('email').isEmail().normalizeEmail(),
  body('password').notEmpty(),
], async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, message: '請輸入正確的郵箱和密碼' });
    return;
  }

  const { email, password } = req.body;

  try {
    const [rows] = await pool.execute(
      'SELECT id, nickname, email, phone, password_hash, lang, is_verified FROM users WHERE email = ?',
      [email]
    );
    const users = rows as any[];

    // 邮箱不存在
    if (users.length === 0) {
      res.status(401).json({ success: false, message: '此郵箱尚未註冊，請先完成註冊' });
      return;
    }

    const user = users[0];

    // 密码错误
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      res.status(401).json({ success: false, message: '密碼錯誤，請重新輸入' });
      return;
    }

    // 未验证邮箱
    if (!user.is_verified) {
      res.status(403).json({
        success: false,
        message: '郵箱尚未驗證，請查收驗證郵件並完成驗證後再登入',
        needVerify: true,
        email: user.email,
      });
      return;
    }

    // 登录成功，签发 JWT
    const token = jwt.sign(
      { id: user.id, email: user.email, nickname: user.nickname },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as any
    );

    res.json({
      success: true,
      message: '登入成功',
      data: {
        token,
        user: { id: user.id, nickname: user.nickname, email: user.email, phone: user.phone, lang: user.lang }
      }
    });
  } catch (err) {
    console.error('登录失败:', err);
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ─── 忘记密码 POST /api/auth/forgot-password ─────────────────
router.post('/forgot-password', [
  body('email').isEmail().normalizeEmail(),
], async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  try {
    const [rows] = await pool.execute('SELECT id, nickname FROM users WHERE email = ? AND is_verified = 1', [email]);
    if ((rows as any[]).length > 0) {
      const user = (rows as any[])[0];
      const token = uuidv4();
      const expires = new Date(Date.now() + 30 * 60 * 1000);
      await pool.execute(
        'INSERT INTO password_resets (email, token, expires_at) VALUES (?, ?, ?)',
        [email, token, expires]
      );
      const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;
      await sendMail(
        email,
        '【SnowTrip】重置密碼',
        `您好 ${user.nickname}，\n\n請點擊以下連結重置密碼（30分鐘內有效）：\n${resetUrl}`,
        `<p>您好 <strong>${user.nickname}</strong>，</p>
         <p>請點擊 <a href="${resetUrl}">此連結</a> 重置您的密碼（30分鐘內有效）。</p>`
      );
    }
    res.json({ success: true, message: '如郵箱已驗證，重置連結已發送至您的郵箱' });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ─── 重置密码 POST /api/auth/reset-password ──────────────────
router.post('/reset-password', [
  body('token').notEmpty(),
  body('password').isLength({ min: 8 }),
], async (req: Request, res: Response): Promise<void> => {
  const { token, password } = req.body;
  try {
    const [rows] = await pool.execute(
      'SELECT email FROM password_resets WHERE token = ? AND expires_at > NOW() AND used = 0', [token]
    );
    if ((rows as any[]).length === 0) {
      res.status(400).json({ success: false, message: '重置連結無效或已過期' });
      return;
    }
    const { email } = (rows as any[])[0];
    const hash = await bcrypt.hash(password, 12);
    await pool.execute('UPDATE users SET password_hash = ? WHERE email = ?', [hash, email]);
    await pool.execute('UPDATE password_resets SET used = 1 WHERE token = ?', [token]);
    res.json({ success: true, message: '密碼重置成功，請重新登入' });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

// ─── 获取当前用户 GET /api/auth/me ───────────────────────────
router.get('/me', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, nickname, email, phone, lang, avatar_url, created_at FROM users WHERE id = ?',
      [req.user!.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '用戶不存在' });
      return;
    }
    res.json({ success: true, data: (rows as any[])[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: '伺服器錯誤' });
  }
});

export default router;
