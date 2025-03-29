import express from "express";
import jwt from "jsonwebtoken";
import { response } from "../helpers/response";
import { ACCESS_TOKEN_SECRET } from "../consts";

export const isAuthenticated = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    response({
      res,
      statusCode: 403,
    });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, ACCESS_TOKEN_SECRET, (err) => {
    if (err) {
      response({
        res,
        statusCode: 403,
      });
    } else {
      next();
    }
  });
};
