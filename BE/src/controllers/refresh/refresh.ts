import express from "express";
import jwt from "jsonwebtoken";
import { response } from "../../common";
import { ROUTES_NAMES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import { RefreshToken } from "../../models/RefreshToken";

const refresh = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    response({
      res,
      statusCode: 400,
      route: ROUTES_NAMES.REFRESH,
    });
  }

  const storedToken = await RefreshToken.findOne({ token: refreshToken });

  if (!storedToken) {
    console.warn("\x1b[36m%s\x1b[0m", "Possible token theft detected!");

    response({
      res,
      statusCode: 403,
      route: ROUTES_NAMES.REFRESH,
    });
  }

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string
    );

    const parsedDecoded = JSON.parse(JSON.stringify(decoded));

    const newAccessToken = generateAccessToken(parsedDecoded.userId);

    const newRefreshToken = await generateRefreshToken(parsedDecoded.userId);

    const deletedToken = await RefreshToken.deleteOne({
      token: refreshToken,
    });

    if (!deletedToken) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.REFRESH,
      });
      return;
    }

    response({
      res,
      statusCode: 201,
      route: ROUTES_NAMES.REFRESH,
      payload: { accessToken: newAccessToken, refreshToken: newRefreshToken },
    }).end();
  } catch (err) {
    response({
      res,
      statusCode: 500,
    });
  }
};

export default refresh;

/**
 * @swagger
 * /refresh:
 *   post:
 *     summary: Generate new access and refresh token
 *     tags:
 *       - Refresh
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: "your.jwt.token"
 *     responses:
 *       201:
 *         description: Successfully refreshed token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                   example: "your.jwt.token"
 *                 refreshToken:
 *                   type: string
 *                   example: "your.jwt.token"
 *       400:
 *        description:  NO_REFRESH_TOKEN_PROVIDED
 *       403:
 *        description:  INVALID_REFRESH_TOKEN
 *       404:
 *        description:  REFRESH_TOKEN_NOT_FOUND
 */
