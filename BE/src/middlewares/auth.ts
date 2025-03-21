import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { response } from "../common";

dotenv.config();

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response({ res, statusCode: 403 });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user: any) => {
      if (err) return res.status(403).json({ message: "Invalid Token" });

      // @ts-ignore
      req.user = user;
      next();
    }
  );
};
