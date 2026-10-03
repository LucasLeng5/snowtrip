import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
  host:   process.env.SMTP_HOST || 'smtp.aliyun.com',
  port:   Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE === 'true',
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
