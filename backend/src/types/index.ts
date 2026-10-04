import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: { id: number; email: string; nickname: string };
}

export interface User {
  id: number;
  nickname: string;
  email: string;
  phone: string;
  password_hash: string;
  lang: string;
  is_verified: number;
  created_at: Date;
}

export interface Resort {
  id: number;
  name: string;
  name_en: string | null;
  location: string;
  nation: 'JP' | 'CN' | 'NZ';
  price: number;
  currency: string;
  photo_url: string | null;
  description_tc: string | null;
  description_en: string | null;
  features: string[] | null;
  is_active: number;
}

export interface Coach {
  id: number;
  name: string;
  title_tc: string;
  title_en: string;
  certifications: string;
  languages: string;
  experience: number;
  photo_url: string | null;
  resorts: string | null;
}

export interface Booking {
  id: number;
  order_no: string;
  user_id: number;
  resort_id: number;
  coach_id: number | null;
  ski_type: 'ski' | 'snowboard';
  group_size: number;
  course_type: 'private' | 'group';
  start_date: string;
  end_date: string;
  need_equipment: number;
  skill_level: number;
  contact_info: Record<string, string>;
  total_amount: number;
  currency: string;
  status: string;
  notes: string | null;
}

export interface Payment {
  id: number;
  booking_id: number;
  payment_no: string;
  method: string;
  amount: number;
  currency: string;
  status: string;
  gateway_tx_id: string | null;
  paid_at: Date | null;
}
