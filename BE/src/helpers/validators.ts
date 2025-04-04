import bcrypt from "bcrypt";
import { z } from "zod";
import {
  UsernameSchema,
  EmailSchema,
  PasswordSchema,
  VerificationCodeSchema,
} from "../zodValidationSchemas";

const isValidValue = (schema: z.ZodSchema, value: unknown) => {
  const result = schema.safeParse(value);

  return result.success;
};

export const isValidUsername = (username: string) => {
  return isValidValue(UsernameSchema, username);
};

export const isValidEmail = (email: string) => {
  return isValidValue(EmailSchema, email);
};

export const isValidPassword = (password: string) => {
  return isValidValue(PasswordSchema, password);
};

export const isUserPasswordMatch = async (
  password: string,
  encryptedPassword: string
) => {
  return await bcrypt.compare(password, encryptedPassword);
};

export const isVerificationCodeMatch = async (
  verificationCode: string,
  encryptedVerificationCode: string
) => {
  return await bcrypt.compare(verificationCode, encryptedVerificationCode);
};

export const isValidResetCode = (resetCode: string) => {
  return isValidValue(VerificationCodeSchema, resetCode);
};
