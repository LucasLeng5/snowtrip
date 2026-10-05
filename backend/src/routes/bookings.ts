import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
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
  
  // 确保参数是有效的数字
  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const limitNum = Math.min(100, Math.max(1, parseInt(String(limit), 10) || 10));
  const offsetNum = (pageNum - 1) * limitNum;
  const userId = parseInt(String(req.user!.id), 10);
  
  console.log(`查询订单: userId=${userId}, status=${status}, page=${pageNum}, limit=${limitNum}, offset=${offsetNum}`);
  
  try {
    let sql = `
      SELECT b.*, r.name AS resort_name, r.location, r.photo_url,
             c.name AS coach_name
      FROM bookings b
      LEFT JOIN resorts r ON b.resort_id = r.id
      LEFT JOIN coaches c ON b.coach_id  = c.id
      WHERE b.user_id = ?
    `;
    const params: any[] = [userId];

    if (status && typeof status === 'string') { 
      sql += ' AND b.status = ?'; 
      params.push(status); 
    }
    sql += ' ORDER BY b.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offsetNum);
    
    console.log(`SQL: ${sql}, Params:`, params);

    // 尝试使用 query 而不是 execute,避免 prepared statement 的问题
    const [rows] = await pool.query(sql, params);
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
// 如果提供了 booking_data，同时创建订单记录
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
  const { to, subject, body: text, customerEmail, booking_data } = req.body;

  // 尝试获取登录用户信息（可选）
  let authUserId: number | null = null;
  let authUserEmail: string | null = null;
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      const jwt = require('jsonwebtoken');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'snowtrip_secret_key');
      authUserId = Number(decoded.id);
      authUserEmail = decoded.email || null;
    }
  } catch (err) {
    // Token 无效或过期，忽略
  }

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

  // Build list of recipients: only customer (no admin email)
  const recipients: { to: string; subject: string; text: string; html: string }[] = [];

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

  // 如果提供了 booking_data，同时创建订单记录
  let bookingResult = null;
  if (booking_data && booking_data.resort_name && booking_data.start_date) {
    // 优先使用登录用户的邮箱，其次使用表单填写的邮箱
    const lookupEmail = authUserEmail || customerEmail || booking_data.email || '';
    bookingResult = await createBookingFromEmail(pool, booking_data, lookupEmail, authUserId);
  }

  res.json({ success: true, results, booking: bookingResult });
});

// ─── 辅助：根据邮件请求同时创建订单记录 ─────────────────
async function createBookingFromEmail(pool: any, bookingData: any, userEmail: string, authUserId?: number | null): Promise<any> {
  try {
    // 查找或创建用户
    let userId = authUserId || null;
    
    // 如果没有提供认证用户 ID，则通过邮箱查找或创建
    if (!userId && userEmail) {
      const [userRows] = await pool.execute(
        'SELECT id FROM users WHERE email = ?', [userEmail]
      );
      if ((userRows as any[]).length > 0) {
        userId = (userRows as any[])[0].id;
      } else if (bookingData.contact_info?.name) {
        // 用户不存在，创建一个临时用户
        const tempPassword = await bcrypt.hash('temp123456', 10);
        const [result] = await pool.execute(
          'INSERT INTO users (nickname, email, phone, password_hash, is_verified) VALUES (?, ?, ?, ?, 1)',
          [bookingData.contact_info.name, userEmail, bookingData.contact_info.phone || '', tempPassword]
        );
        userId = (result as any).insertId;
      }
    }

    if (!userId) {
      console.warn('无法确定用户ID，跳过订单创建');
      return null;
    }

    // 查找雪场 - 尝试多种匹配方式
    let resort = null;
    const resortName = bookingData.resort_name?.trim() || '';
    
    // 简单的繁简转换映射（常见字符）
    const tradToSimpMap: Record<string, string> = {
      '溫': '温', '湯': '汤', '龍': '龙', '馬': '马', '爺': '爷',
      '輕': '轻', '澤': '泽', '樂': '乐', '爾': '尔',
      '華': '华', '雲': '云', '電': '电', '車': '车', '纜': '缆',
      '場': '场', '館': '馆', '灣': '湾', '島': '岛', '區': '区',
      '縣': '县', '鎮': '镇', '鄉': '乡', '莊': '庄',
    };
    
    // 将繁体转换为简体
    const simpResortName = resortName.split('').map((c: string) => tradToSimpMap[c] || c).join('');
    
    // 0. 先处理常见的英文/混合名称映射
    let searchName = simpResortName;
    const nameMap: Record<string, string> = {
      // 二世谷系列
      'niseko village': '二世谷・Niseko Village',
      'niseko united': '二世谷',
      'grand hirafu': '二世谷・Grand Hirafu',
      'hanazono': '二世谷・HANAZONO',
      'annupuri': '二世谷・Annupuri',
      'moiwa': '二世谷・Moiwa',
      // 札幌地区
      'teine': '手稻',
      'sapporo kokusai': '札幌國際',
      'sapporo bankei': '札幌盤溪',
      // 北海道其他
      'furano': '富良野',
      'rusutsu': '留壽都',
      'kiroro': '喜樂樂 Kiroro',
      'tomamu': '星野',
      'hoshino': '星野',
      'asarigawa': '朝里川',
      'tenguyama': '天狗山',
      'onze': 'ONZE',
      // 长野/新潟地区
      'zao': '藏王温泉',
      'hakuba': '白马',
      'nozawa onsen': '野澤溫泉',
      'myoko': '妙高杉之原',
      'gala yuzawa': 'GALA 湯澤',
      'naspa': 'NASPA Ski Garden',
      'yomase': 'Yomase 溫泉',
      'madarao': '斑尾高原',
      'shiga kogen': '志賀高原',
      'ryuo': '龍王 Ski Park',
      'naeba': '苗場',
      'lotte arai': 'LOTTE ARAI Resort',
      'karuizawa prince': '輕井澤 Prince Hotel',
      'karuizawa snow park': '輕井澤 Snow Park',
      'joetsu kokusai': '上越國際',
      'kagura': '神樂',
      'kandatsu': '神立 Snow Resort',
      'ishiuchi maruyama': '石打丸山',
      'yuzawa kogen': '湯澤高原',
      'yuzawa nakazato': '湯澤中里',
      'iwahara': '岩原',
      // 白马地区
      'happo one': '八方尾根',
      'norikura': '乘鞍',
      'kashimayari': '鹿島槍',
      'tsugaike': '栂池高原',
      'goryu': '五龍',
      'iwatake': '岩岳',
      'sanosaka': '爺岳',
      'sakanoue': '佐野坂',
      // 关西/岐阜地区
      'dynaland': 'Dynaland',
      'grand snow': 'Grand Snow',
      'okuibuki': '奧伊吹',
      'rokkosan': '六甲山 Snow Park',
      'biwako valley': '琵琶湖 Valley',
      'biwako hakkenzan': '琵琶湖箱館山',
      // 中国雪场
      'chongli': '崇禮',
      'wanlong': '萬龍',
      'genting': '密苑',
      'thaiwoo': '太舞',
      // 新西兰雪场
      'cardrona': '卡德羅納',
      'treble cone': '三錐山',
      'coronet peak': '皇冠峰',
      'the remarkables': '卓越山',
    };
    
    // 如果包含英文关键词，转换为中文前缀
    for (const [en, zh] of Object.entries(nameMap)) {
      if (resortName.toLowerCase().includes(en)) {
        searchName = zh;
        break;
      }
    }
    
    // 1. 精确匹配 name
    const [exactRows] = await pool.execute(
      'SELECT id, name, price, currency FROM resorts WHERE name = ? AND is_active = 1 LIMIT 1',
      [resortName]
    );
    if ((exactRows as any[]).length > 0) {
      resort = (exactRows as any[])[0];
    } else {
      // 2. LIKE 模糊匹配（使用原始名称）
      const [likeRows] = await pool.execute(
        'SELECT id, name, price, currency FROM resorts WHERE name LIKE ? AND is_active = 1 LIMIT 1',
        [`%${resortName}%`]
      );
      if ((likeRows as any[]).length > 0) {
        resort = (likeRows as any[])[0];
      } else {
        // 3. 使用转换后的中文名称进行 LIKE 匹配
        if (searchName !== resortName) {
          const [zhLikeRows] = await pool.execute(
            'SELECT id, name, price, currency FROM resorts WHERE name LIKE ? AND is_active = 1 LIMIT 1',
            [`%${searchName}%`]
          );
          if ((zhLikeRows as any[]).length > 0) {
            resort = (zhLikeRows as any[])[0];
          }
        }
        // 4. 反向 LIKE（数据库中名称包含前端传来的名称）
        if (!resort) {
          const [reverseRows] = await pool.execute(
            'SELECT id, name, price, currency FROM resorts WHERE ? LIKE CONCAT(name, "%") AND is_active = 1 LIMIT 1',
            [resortName]
          );
          if ((reverseRows as any[]).length > 0) {
            resort = (reverseRows as any[])[0];
          }
        }
      }
    }

    if (!resort) {
      // 输出十六进制以便调试
      const hexName = Buffer.from(resortName, 'utf-8').toString('hex');
      console.warn(`未找到雪场: ${resortName} (HEX: ${hexName})`);
      return null;
    }

    // 计算总价
    const price = Number(resort.price) || 0;
    const days = bookingData.end_date
      ? Math.max(1, Math.ceil((new Date(bookingData.end_date).getTime() - new Date(bookingData.start_date).getTime()) / (1000*60*60*24)))
      : 1;
    const total_amount = price * days;
    const order_no = genOrderNo();

    const contact_info = JSON.stringify(bookingData.contact_info || {});

    await pool.execute(
      `INSERT INTO bookings
        (order_no, user_id, resort_id, coach_id, ski_type, group_size, course_type,
         start_date, end_date, need_equipment, skill_level, contact_info, total_amount, currency, notes, status,
         user_email, resort_name)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        order_no, userId, resort.id, bookingData.coach_id || null,
        bookingData.ski_type || 'ski',
        bookingData.group_size || 1,
        bookingData.course_type || 'private',
        bookingData.start_date, bookingData.end_date || bookingData.start_date,
        bookingData.need_equipment ? 1 : 0,
        bookingData.skill_level ?? 0,
        contact_info,
        total_amount, resort.currency || 'JPY',
        bookingData.notes || null,
        'confirmed',
        userEmail,
        resort.name
      ]
    );

    console.log(`订单创建成功: ${order_no}, 用户ID: ${userId}, 雪场ID: ${resort.id}, 用户邮箱: ${userEmail}, 雪场名称: ${resort.name}`);
    return { order_no, total_amount, currency: resort.currency, status: 'confirmed' };
  } catch (err) {
    console.error('创建订单记录失败:', err);
    return null;
  }
}

function isEN_subject(subj: string): boolean {
  return subj.startsWith('Ski Lesson');
}

export default router;
