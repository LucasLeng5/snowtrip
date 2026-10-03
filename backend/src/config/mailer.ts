import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host:   '74.125.142.109', // 直接使用真实 IP，绕过代理 DNS 劫持
  port:   Number(process.env.SMTP_PORT) || 587,
  secure: false,
  tls: {
    servername: 'smtp.gmail.com', // TLS 验证仍使用正确域名
  },
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendMail = async (to: string, subject: string, text: string, html?: string) => {
  return transporter.sendMail({
    from: process.env.EMAIL_FROM || '"SnowTrip" <noreply@snowtrip.com>',
    to,
    subject,
    text,
    html,
  });
};

export default transporter;
