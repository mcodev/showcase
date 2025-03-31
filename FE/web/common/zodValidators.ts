import { z } from 'zod';

export const EmailSchema = z.string().min(1, 'email_required').email('invalid_email');

export const PasswordSchema = z
  .string()
  .min(1, 'password_required')
  .min(8, 'password_too_short')
  .max(30, 'password_too_long')
  .regex(/[A-Z]/, 'password_no_uppercase')
  .regex(/\d/, 'password_no_number')
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'password_no_special');

export const UsernameSchema = z
  .string()
  .min(1, 'username_required')
  .min(3, 'username_too_short')
  .max(15, 'username_too_long')
  .regex(/^[A-Za-z ]+$/, 'username_invalid');
