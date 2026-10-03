import { Router, Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db';
import { sendMail } from '../config/mailer';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

// 生成订单号
const genOrderNo = (): string => {
  const ts = Date.now().toString().slice(-8);
  const rd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ST${ts}${rd}`;
};

// ─── 创建预订 POST /api/bookings ─────────────────────────────
router.post('/', authenticate, [
  body('resort_id').isInt({ min: 1 }),
  body('ski_type').isIn(['ski', 'snowboard']),
  body('group_size').isInt({ min: 1, max: 10 }),
  body('course_type').isIn(['private', 'group']),
  body('start_date').isDate(),
  body('end_date').isDate(),
  body('skill_level').isInt({ min: 0, max: 3 }),
  body('contact_info').isObject(),
], async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  const {
    resort_id, coach_id, ski_type, group_size, course_type,
    start_date, end_date, need_equipment, skill_level, contact_info, notes
  } = req.body;

  try {
    // 获取雪场价格
    const [resortRows] = await pool.execute(
      'SELECT price, currency FROM resorts WHERE id = ? AND is_active = 1',
      [resort_id]
    );
    if ((resortRows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '雪场不存在' });
      return;
    }
    const { price, currency } = (resortRows as any[])[0];

    // 计算天数与总价
    const days = Math.max(1, Math.ceil(
      (new Date(end_date).getTime() - new Date(start_date).getTime()) / (1000 * 60 * 60 * 24)
    ));
    const total_amount = price * days;
    const order_no = genOrderNo();

    const [result] = await pool.execute(
      `INSERT INTO bookings
        (order_no, user_id, resort_id, coach_id, ski_type, group_size, course_type,
         start_date, end_date, need_equipment, skill_level, contact_info, total_amount, currency, notes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order_no, req.user!.id, resort_id, coach_id || null,
        ski_type, group_size, course_type,
        start_date, end_date, need_equipment ? 1 : 0,
        skill_level, JSON.stringify(contact_info),
        total_amount, currency, notes || null
      ]
    );

    const bookingId = (result as any).insertId;
    res.status(201).json({
      success: true,
      message: '预订创建成功，请完成支付',
      data: { id: bookingId, order_no, total_amount, currency, status: 'pending' }
    });
  } catch (err) {
    console.error('创建预订失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 获取我的预订列表 GET /api/bookings ──────────────────────
router.get('/', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  const { status, page = '1', limit = '10' } = req.query;
  const offset = (Number(page) - 1) * Number(limit);

  try {
    let sql = `
      SELECT b.*, r.name AS resort_name, r.location, r.photo_url,
             c.name AS coach_name
      FROM bookings b
      LEFT JOIN resorts r ON b.resort_id = r.id
      LEFT JOIN coaches c ON b.coach_id  = c.id
      WHERE b.user_id = ?
    `;
    const params: (string | number)[] = [req.user!.id];

    if (status) { sql += ' AND b.status = ?'; params.push(status as string); }
    sql += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), offset);

    const [rows] = await pool.execute(sql, params);
    res.json({ success: true, data: rows });
  } catch (err) {
    console.error('获取预订列表失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 获取预订详情 GET /api/bookings/:orderNo ─────────────────
router.get('/:orderNo', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      `SELECT b.*, r.name AS resort_name, r.location, r.photo_url, r.currency,
              c.name AS coach_name, c.title_tc, c.title_en,
              p.method AS payment_method, p.status AS payment_status, p.paid_at
       FROM bookings b
       LEFT JOIN resorts r ON b.resort_id = r.id
       LEFT JOIN coaches c ON b.coach_id  = c.id
       LEFT JOIN payments p ON p.booking_id = b.id AND p.status = 'success'
       WHERE b.order_no = ? AND b.user_id = ?`,
      [req.params.orderNo, req.user!.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '订单不存在' });
      return;
    }
    const booking = (rows as any[])[0];
    booking.contact_info = typeof booking.contact_info === 'string'
      ? JSON.parse(booking.contact_info) : booking.contact_info;
    res.json({ success: true, data: booking });
  } catch (err) {
    console.error('获取预订详情失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 取消预订 PATCH /api/bookings/:orderNo/cancel ────────────
router.patch('/:orderNo/cancel', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      'SELECT id, status, created_at FROM bookings WHERE order_no = ? AND user_id = ?',
      [req.params.orderNo, req.user!.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '订单不存在' });
      return;
    }
    const booking = (rows as any[])[0];
    if (!['pending', 'paid', 'confirmed'].includes(booking.status)) {
      res.status(400).json({ success: false, message: '该订单状态无法取消' });
      return;
    }
    await pool.execute(
      'UPDATE bookings SET status = "cancelled" WHERE id = ?',
      [booking.id]
    );
    res.json({ success: true, message: '订单已取消' });
  } catch (err) {
    console.error('取消预订失败:', err);
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 发送预订邮件 POST /api/bookings/send-email ──────────────
// 前端填写预订资料后调用，同时发送给管理员邮箱和客户邮箱
router.post('/send-email', [
  body('to').isEmail(),
  body('subject').notEmpty(),
  body('body').notEmpty(),
], async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  const { to, subject, body: text, customerEmail } = req.body;

  const htmlContent = `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
    <h2 style="color:#0b1929;border-bottom:2px solid #0ea5e9;padding-bottom:8px">🎿 SnowTrip 新預訂通知</h2>
    <pre style="background:#f8f9fa;padding:16px;border-radius:8px;font-size:14px;line-height:1.8;white-space:pre-wrap">${text}</pre>
    <p style="color:#888;font-size:12px;margin-top:16px">此郵件由 SnowTrip 預訂系統自動發送</p>
  </div>`;

  const customerHtml = `<div style="font-family:sans-serif;max-width:600px;margin:auto;padding:24px;border:1px solid #eee;border-radius:12px">
    <h2 style="color:#0b1929;border-bottom:2px solid #0ea5e9;padding-bottom:8px">🎿 SnowTrip 預約確認</h2>
    <p style="font-size:15px;line-height:1.8;color:#333">您好，我們已收到您的滑雪課程預約請求，以下是您的預約資料：</p>
    <pre style="background:#f8f9fa;padding:16px;border-radius:8px;font-size:14px;line-height:1.8;white-space:pre-wrap">${text}</pre>
    <p style="font-size:14px;line-height:1.8;color:#333;margin-top:16px">我們將盡快確認您的預約並與您聯繫。如有任何疑問，請隨時回覆此郵件。</p>
    <p style="color:#888;font-size:12px;margin-top:16px">此郵件由 SnowTrip 預訂系統自動發送</p>
  </div>`;

  // Build list of recipients: admin + customer
  const recipients: { to: string; subject: string; text: string; html: string }[] = [
    { to, subject, text, html: htmlContent },
  ];

  if (customerEmail && typeof customerEmail === 'string' && customerEmail.trim()) {
    recipients.push({
      to: customerEmail.trim(),
      subject: isEN_subject(subject) ? `Booking Confirmation - SnowTrip` : `預約確認 - SnowTrip`,
      text: `您好，我們已收到您的滑雪課程預約請求。以下是您的預約資料：\n\n${text}\n\n我們將盡快確認您的預約並與您聯繫。`,
      html: customerHtml,
    });
  }

  const results: { to: string; success: boolean; error?: string }[] = [];

  for (const r of recipients) {
    try {
      await sendMail(r.to, r.subject, r.text, r.html);
      results.push({ to: r.to, success: true });
    } catch (err: any) {
      console.error(`发送邮件至 ${r.to} 失败:`, err);
      results.push({ to: r.to, success: false, error: err?.message || 'Unknown error' });
    }
  }

  res.json({ success: true, results });
});

function isEN_subject(subj: string): boolean {
  return subj.startsWith('Ski Lesson');
}

export default router;
