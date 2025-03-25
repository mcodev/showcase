import bcrypt from "bcrypt";
import { PASSWORD_ENCRYPTION_LEVEL } from "../consts";

export const generateEncryptedPassword = async (password: string) => {
  return await bcrypt.hash(password, PASSWORD_ENCRYPTION_LEVEL);
};

export const generate5DigitResetCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
