import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RefreshToken } from "../models/RefreshToken";

dotenv.config();

// Generate JWT Access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign(
    { userId: userId },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "12h" }
  );
};

// Generate JWT Refresh Token
export const generateRefreshToken = async (userId: string) => {
  const refreshToken = jwt.sign(
    { userId: userId },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );

  // Store the token in the DB
  await RefreshToken.create({ userId: userId, token: refreshToken });

  if (!refreshToken) {
    return false;
  }

  return refreshToken;
};

export const verifyRefreshToken = async (
  refreshToken: string,
  email: string
) => {
  try {
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET as string);

    const storedToken = await RefreshToken.findOne({ token: refreshToken });

    if (!storedToken) {
      return false;
    }

    if (storedToken.userId.toString() !== email) {
      return false;
    }
    return true;
  } catch (err) {
    return false;
  }
};
