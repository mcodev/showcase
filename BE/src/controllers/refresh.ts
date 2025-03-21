import express from "express";
import jwt from "jsonwebtoken";
import { response } from "../common";
import { ROUTES_NAMES } from "../consts";
import { generateAccessToken } from "../helpers/tokens";
import { RefreshToken } from "../models/RefreshToken";

export const refresh = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    response({
      res,
      statusCode: 403,
      route: ROUTES_NAMES.AUTH,
      //   message: "No refresh token provided",
    });
    return;
  }

  // Check if the token exists in the DB
  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken) {
    response({
      res,
      statusCode: 403,
      route: ROUTES_NAMES.AUTH,
      //   message: "Invalid refresh token",
    });
    return;
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    async (err: any, user: any) => {
      if (err) {
        console.log("err in verification", err);

        response({
          res,
          statusCode: 403,
          route: ROUTES_NAMES.AUTH,
          //   message: "Invalid refresh token",
        });
        return;
      }

      const newAccessToken = generateAccessToken(user);
      response({
        res,
        statusCode: 200,
        route: ROUTES_NAMES.AUTH,
        payload: { accessToken: newAccessToken },
      }).end();
    }
  );
};
