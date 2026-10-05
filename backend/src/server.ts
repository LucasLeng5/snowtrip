import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

import authRoutes    from './routes/auth';
import resortRoutes  from './routes/resorts';
import coachRoutes   from './routes/coaches';
import bookingRoutes from './routes/bookings';
import paymentRoutes from './routes/payments';
import contactRoutes from './routes/contacts';

const app = express();
const PORT = process.env.PORT || 3001;

// ─── 安全中间件 ───────────────────────────────────────────────
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));

// ─── 请求限流（防止暴力攻击）────────────────────────────────
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
const authLimiter = rateLimit({ 
  windowMs: 15 * 60 * 1000, 
  max: 10, 
  message: { success: false, message: '请求过于频繁，请 15 分钟后重试' },
  // 排除邮箱验证接口，避免用户点击验证链接时被限流
  skip: (req) => req.path === '/verify-email'
});
app.use(limiter);
app.use('/api/auth', authLimiter);

// ─── 基础中间件 ───────────────────────────────────────────────
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ─── 健康检查 ─────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString(), version: '1.0.0' });
});

// ─── API 路由 ─────────────────────────────────────────────────
app.use('/api/auth',     authRoutes);
app.use('/api/resorts',  resortRoutes);
app.use('/api/coaches',  coachRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contacts', contactRoutes);

// ─── 404 处理 ─────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ success: false, message: '接口不存在' });
});

// ─── 全局错误处理 ─────────────────────────────────────────────
app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('未捕获错误:', err);
  res.status(500).json({ success: false, message: '服务器内部错误' });
});

// ─── 启动服务 ─────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 SnowTrip API 启动成功`);
  console.log(`   地址: http://localhost:${PORT}`);
  console.log(`   环境: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   接口: http://localhost:${PORT}/health`);
});

export default app;
