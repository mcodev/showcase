import jwt from "jsonwebtoken";
import { RefreshToken } from "../models/RefreshToken";
import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from "consts";

// Generate JWT Access Token
export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: "12h",
  });
};

// Generate JWT Refresh Token
export const generateRefreshToken = async (userId: string) => {
  const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

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
    jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

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
