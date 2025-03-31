import { z } from "zod";

export const EmailSchema = z.string().min(1).email();

export const PasswordSchema = z
  .string()
  .min(8)
  .max(30)
  .regex(/[A-Z]/)
  .regex(/\d/)
  .regex(/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/);

export const UsernameSchema = z
  .string()
  .min(3)
  .max(15)
  .regex(/^[A-Za-z ]+$/);

export const VerificationCodeSchema = z
  .string()
  .min(5)
  .max(5)
  .regex(/^[0-9]+$/);
