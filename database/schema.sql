-- ============================================================
-- SnowTrip Database Schema
-- MySQL 8.0+
-- ============================================================

CREATE DATABASE IF NOT EXISTS snowtrip1005 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE snowtrip1005;

-- ─── 用户表 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  nickname      VARCHAR(50)  NOT NULL,
  email         VARCHAR(100) NOT NULL UNIQUE,
  phone         VARCHAR(30)  NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  avatar_url    VARCHAR(500) DEFAULT NULL,
  lang          ENUM('TC','SC','EN','JP','KR') DEFAULT 'TC',
  is_verified   TINYINT(1)   DEFAULT 0,
  reset_token   VARCHAR(255) DEFAULT NULL,
  reset_expires DATETIME     DEFAULT NULL,
  created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_email (email),
  INDEX idx_phone (phone)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 教练表 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS coaches (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  title_tc     VARCHAR(100) NOT NULL,
  title_en     VARCHAR(100) NOT NULL,
  certifications VARCHAR(200) NOT NULL,
  languages    VARCHAR(200) NOT NULL,
  experience   INT          NOT NULL COMMENT '教学年数',
  photo_url    VARCHAR(500) DEFAULT NULL,
  resorts      VARCHAR(200) DEFAULT NULL,
  bio_tc       TEXT         DEFAULT NULL,
  bio_en       TEXT         DEFAULT NULL,
  is_active    TINYINT(1)   DEFAULT 1,
  created_at   DATETIME     DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 雪场表 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS resorts (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  name_en     VARCHAR(100) DEFAULT NULL,
  location    VARCHAR(200) NOT NULL,
  nation      ENUM('JP','CN','NZ') NOT NULL,
  region      VARCHAR(50)  DEFAULT NULL COMMENT '地区(如:北海道、吉林等)',
  price       DECIMAL(10,2) NOT NULL,
  currency    VARCHAR(10)  NOT NULL DEFAULT 'JPY',
  photo_url   VARCHAR(500) DEFAULT NULL,
  description_tc TEXT      DEFAULT NULL,
  description_en TEXT      DEFAULT NULL,
  features    JSON         DEFAULT NULL COMMENT '["特色1","特色2"]',
  is_active   TINYINT(1)   DEFAULT 1,
  created_at  DATETIME     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_nation (nation)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 预订表 ──────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  order_no      VARCHAR(30)  NOT NULL UNIQUE,
  user_id       INT          NOT NULL,
  resort_id     INT          NOT NULL,
  coach_id      INT          DEFAULT NULL,
  ski_type      ENUM('ski','snowboard') NOT NULL,
  group_size    TINYINT      NOT NULL DEFAULT 1,
  course_type   ENUM('private','group') NOT NULL DEFAULT 'private',
  start_date    DATE         NOT NULL,
  end_date      DATE         NOT NULL,
  need_equipment TINYINT(1)  DEFAULT 0,
  skill_level   TINYINT      NOT NULL COMMENT '0=完全新手 1=初学者 2=初中阶 3=中高阶',
  contact_info  JSON         NOT NULL COMMENT '{"whatsapp":"...","line":"...","wechat":"...","email":"..."}',
  equipment_sets JSON        DEFAULT NULL COMMENT '租借装备明细数组',
  total_amount  DECIMAL(10,2) NOT NULL,
  currency      VARCHAR(10)  NOT NULL,
  status        ENUM('pending','paid','confirmed','cancelled','refunded') DEFAULT 'pending',
  notes         TEXT         DEFAULT NULL,
  -- 冗余字段（方便查询，避免 JOIN）
  form_email    VARCHAR(128) DEFAULT NULL COMMENT '预约表单填写的邮箱',
  user_email    VARCHAR(128) DEFAULT NULL COMMENT '用户注册邮箱（冗余）',
  resort_name   VARCHAR(128) DEFAULT NULL COMMENT '雪场名称（冗余）',
  created_at    DATETIME     DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE,
  FOREIGN KEY (resort_id) REFERENCES resorts(id) ON DELETE RESTRICT,
  FOREIGN KEY (coach_id)  REFERENCES coaches(id) ON DELETE SET NULL,
  INDEX idx_user_id   (user_id),
  INDEX idx_order_no  (order_no),
  INDEX idx_status    (status),
  INDEX idx_start_date(start_date),
  INDEX idx_user_email (user_email),
  INDEX idx_form_email (form_email),
  INDEX idx_resort_name (resort_name)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 支付记录表 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  booking_id      INT          NOT NULL,
  payment_no      VARCHAR(50)  NOT NULL UNIQUE,
  method          ENUM('wechat','alipay','unionpay','visa','mastercard','applepay','googlepay') NOT NULL,
  amount          DECIMAL(10,2) NOT NULL,
  currency        VARCHAR(10)  NOT NULL,
  status          ENUM('pending','processing','success','failed','refunded') DEFAULT 'pending',
  gateway_tx_id   VARCHAR(200) DEFAULT NULL COMMENT '第三方支付交易ID',
  gateway_response JSON        DEFAULT NULL,
  paid_at         DATETIME     DEFAULT NULL,
  refunded_at     DATETIME     DEFAULT NULL,
  created_at      DATETIME     DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE,
  INDEX idx_booking_id (booking_id),
  INDEX idx_payment_no (payment_no),
  INDEX idx_status     (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 联系留言表 ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) NOT NULL,
  phone      VARCHAR(50)  DEFAULT NULL,
  message    TEXT         NOT NULL,
  lang       VARCHAR(5)   DEFAULT 'TC',
  is_read    TINYINT(1)   DEFAULT 0,
  replied_at DATETIME     DEFAULT NULL,
  created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_email   (email),
  INDEX idx_is_read (is_read)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ─── 密码重置令牌表 ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS password_resets (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(100) NOT NULL,
  token      VARCHAR(255) NOT NULL UNIQUE,
  expires_at DATETIME     NOT NULL,
  used       TINYINT(1)   DEFAULT 0,
  created_at DATETIME     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token (token),
  INDEX idx_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
