# SnowTrip Backend API

Node.js + TypeScript + MySQL 后端服务

## 快速启动

### 1. 安装依赖
```bash
cd backend
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env
# 编辑 .env 填写数据库密码、JWT密钥等
```

### 3. 初始化数据库 snowtrip0817
```bash
mysql -u root -p < ../database/schema.sql
mysql -u root -p --default-character-set=utf8mb4 snowtrip0817 < ../database/seed.sql  #字符集设定为utf8mb4，不然导入会出错

```

### 4. 启动服务
```bash
npm run dev   # 开发模式（热重载）
npm start     # 生产模式
```

## API 接口文档

### 认证接口
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/auth/register | 用户注册 |
| POST | /api/auth/login | 用户登录 |
| POST | /api/auth/forgot-password | 忘记密码 |
| POST | /api/auth/reset-password | 重置密码 |
| GET  | /api/auth/me | 获取当前用户信息 |

### 雪场接口
| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | /api/resorts | 获取雪场列表 |
| GET  | /api/resorts?region=JP | 按地区筛选 |
| GET  | /api/resorts?search=二世谷 | 搜索雪场 |
| GET  | /api/resorts/:id | 获取雪场详情 |

### 教练接口
| 方法 | 路径 | 说明 |
|------|------|------|
| GET  | /api/coaches | 获取教练列表 |
| GET  | /api/coaches/:id | 获取教练详情 |

### 预订接口（需登录）
| 方法 | 路径 | 说明 |
|------|------|------|
| POST  | /api/bookings | 创建预订 |
| GET   | /api/bookings | 获取我的预订列表 |
| GET   | /api/bookings/:orderNo | 获取预订详情 |
| PATCH | /api/bookings/:orderNo/cancel | 取消预订 |

### 支付接口（需登录）
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/payments | 发起支付 |
| GET  | /api/payments/:paymentNo | 查询支付状态 |

### 联系留言
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/contacts | 提交留言 |

## 支付方式说明

| 支付方式 | method 值 | 说明 |
|---------|-----------|------|
| 微信支付 | wechat | 生产环境接入微信支付 SDK |
| 支付宝 | alipay | 生产环境接入支付宝 SDK |
| 银联 | unionpay | 生产环境接入银联 SDK |
| Visa | visa | 生产环境接入 Stripe |
| Mastercard | mastercard | 生产环境接入 Stripe |
| Apple Pay | applepay | 生产环境接入 Stripe |
| Google Pay | googlepay | 生产环境接入 Stripe |
