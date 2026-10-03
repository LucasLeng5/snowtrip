import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import pool from '../config/db';
import { authenticate } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = Router();

const VALID_METHODS = ['wechat', 'alipay', 'unionpay', 'visa', 'mastercard', 'applepay', 'googlepay'];

// ─── 发起支付 POST /api/payments ─────────────────────────────
router.post('/', authenticate, [
  body('booking_id').isInt({ min: 1 }),
  body('method').isIn(VALID_METHODS),
], async (req: AuthRequest, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }

  const { booking_id, method, card_info } = req.body;

  try {
    // 验证订单属于当前用户且状态为 pending
    const [bookingRows] = await pool.execute(
      'SELECT id, order_no, total_amount, currency, status FROM bookings WHERE id = ? AND user_id = ?',
      [booking_id, req.user!.id]
    );
    if ((bookingRows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '订单不存在' });
      return;
    }
    const booking = (bookingRows as any[])[0];
    if (booking.status !== 'pending') {
      res.status(400).json({ success: false, message: '订单状态不允许支付' });
      return;
    }

    // 检查是否已有成功支付
    const [existPay] = await pool.execute(
      'SELECT id FROM payments WHERE booking_id = ? AND status = "success"',
      [booking_id]
    );
    if ((existPay as any[]).length > 0) {
      res.status(400).json({ success: false, message: '订单已完成支付' });
      return;
    }

    const payment_no = `PAY${Date.now()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    // 创建支付记录
    const [payResult] = await pool.execute(
      'INSERT INTO payments (booking_id, payment_no, method, amount, currency, status) VALUES (?, ?, ?, ?, ?, "processing")',
      [booking_id, payment_no, method, booking.total_amount, booking.currency]
    );
    const paymentId = (payResult as any).insertId;

    // ── 模拟支付网关处理 ──────────────────────────────────────
    // 生产环境中替换为真实 SDK：
    //   微信支付: require('wechatpay-node-v3')
    //   支付宝:   require('alipay-sdk')
    //   Stripe:  require('stripe') → stripe.paymentIntents.create()
    const gatewayResult = await simulatePaymentGateway(method, booking.total_amount, booking.currency, card_info);

    if (gatewayResult.success) {
      // 更新支付记录为成功
      await pool.execute(
        'UPDATE payments SET status = "success", gateway_tx_id = ?, gateway_response = ?, paid_at = NOW() WHERE id = ?',
        [gatewayResult.txId, JSON.stringify(gatewayResult), paymentId]
      );
      // 更新订单状态
      await pool.execute(
        'UPDATE bookings SET status = "paid" WHERE id = ?',
        [booking_id]
      );
      res.json({
        success: true,
        message: '支付成功',
        data: {
          payment_no,
          order_no: booking.order_no,
          amount: booking.total_amount,
          currency: booking.currency,
          method,
          gateway_tx_id: gatewayResult.txId,
          paid_at: new Date().toISOString(),
        }
      });
    } else {
      await pool.execute(
        'UPDATE payments SET status = "failed", gateway_response = ? WHERE id = ?',
        [JSON.stringify(gatewayResult), paymentId]
      );
      res.status(402).json({ success: false, message: '支付失败，请检查支付信息后重试' });
    }
  } catch (err) {
    console.error('支付处理失败:', err);
    res.status(500).json({ success: false, message: '支付服务异常，请稍后重试' });
  }
});

// ─── 获取支付记录 GET /api/payments/:paymentNo ───────────────
router.get('/:paymentNo', authenticate, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const [rows] = await pool.execute(
      `SELECT p.*, b.order_no, b.user_id
       FROM payments p
       JOIN bookings b ON p.booking_id = b.id
       WHERE p.payment_no = ? AND b.user_id = ?`,
      [req.params.paymentNo, req.user!.id]
    );
    if ((rows as any[]).length === 0) {
      res.status(404).json({ success: false, message: '支付记录不存在' });
      return;
    }
    res.json({ success: true, data: (rows as any[])[0] });
  } catch (err) {
    res.status(500).json({ success: false, message: '服务器错误' });
  }
});

// ─── 模拟支付网关（生产环境替换为真实SDK）────────────────────
async function simulatePaymentGateway(
  method: string,
  amount: number,
  currency: string,
  cardInfo?: { cardNum?: string; expiry?: string; cvv?: string }
): Promise<{ success: boolean; txId?: string; message?: string }> {
  // 模拟网络延迟
  await new Promise(r => setTimeout(r, 800));

  // 银行卡验证
  if (['visa', 'mastercard'].includes(method)) {
    if (!cardInfo?.cardNum || cardInfo.cardNum.replace(/\s/g, '').length < 16) {
      return { success: false, message: '卡号无效' };
    }
    if (!cardInfo?.cvv || cardInfo.cvv.length < 3) {
      return { success: false, message: 'CVV无效' };
    }
  }

  // 模拟 98% 成功率
  const ok = Math.random() > 0.02;
  if (!ok) return { success: false, message: '银行拒绝交易' };

  const txId = `${method.toUpperCase()}_${Date.now()}_${Math.random().toString(36).slice(2, 10).toUpperCase()}`;
  return { success: true, txId };
}

export default router;
