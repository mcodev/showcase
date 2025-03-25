import jwt from "jsonwebtoken";
import { createToken, getToken } from "../models/RefreshToken";
import {
  ACCESS_TOKEN_EXPIRATION,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRATION,
  REFRESH_TOKEN_SECRET,
} from "../consts";

export const generateAccessToken = (userId: string) => {
  return jwt.sign({ userId: userId }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRATION,
  });
};

export const generateRefreshToken = async (userId: string) => {
  const refreshToken = jwt.sign({ userId: userId }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRATION,
  });

  const isTokenCreated = await createToken(userId, refreshToken);

  if (!isTokenCreated) {
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

    const storedToken = await getToken(refreshToken);

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
