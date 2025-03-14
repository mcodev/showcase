import bcryptjs from "bcryptjs";
import crypto from "crypto";

const SECRET = process.env.SECRET;

export const hashPassword = async (password: string) => {
  return await bcryptjs.hash(password, 10);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcryptjs.compare(password, hash);
};

export const random = () => {
  return crypto.randomBytes(128).toString("base64");
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(salt)
    .digest("hex");
};
