import express from "express";
import jwt from "jsonwebtoken";
import { response } from "../../helpers/response";
import { REFRESH_TOKEN_SECRET, RESPONSE_MESSAGES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import { deleteToken, getToken } from "../../models/RefreshToken";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.REFRESH;

const refresh = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400],
      });

      return;
    }

    const storedToken = await getToken(refreshToken);

    if (!storedToken) {
      console.warn("\x1b[36m%s\x1b[0m", "Possible token theft detected!");

      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403],
      });

      return;
    }

    const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);

    const parsedDecoded = JSON.parse(JSON.stringify(decoded));

    const newAccessToken = generateAccessToken(parsedDecoded.userId);

    const newRefreshToken = await generateRefreshToken(parsedDecoded.userId);

    const isTokenDeleted = await deleteToken(refreshToken);

    if (!isTokenDeleted) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404],
      });

      return;
    }

    response({
      res,
      statusCode: 201,
      message: RESPONSE_MESSAGE[201],
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
