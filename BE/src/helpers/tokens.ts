import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { RefreshToken } from "../models/RefreshToken";

dotenv.config();

// Generate JWT Access Token
export const generateAccessToken = (user: any) => {
  return jwt.sign(
    { userId: user._id },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "30m" }
  );
};

// Generate JWT Refresh Token
export const generateRefreshToken = async (user: any) => {
  const refreshToken = jwt.sign(
    { userId: user._id },
    process.env.REFRESH_TOKEN_SECRET as string,
    { expiresIn: "7d" }
  );

  // Store the token in the DB
  await RefreshToken.create({ userId: user._id, token: refreshToken });

  return refreshToken;
};
