import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.SECRET;

export const random = () => {
  return crypto.randomBytes(128).toString("base64");
};

export const authentication = (salt: string, password: string) => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(SECRET)
    .digest("hex");
};

export const generateResetCode = () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};
