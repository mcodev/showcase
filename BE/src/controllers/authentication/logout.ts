import express from "express";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import { deleteToken } from "../../models/RefreshToken";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.LOGOUT;

const logout = async (
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
      statusCode: 200,
    }).end();
  } catch (error) {
    console.error(error);
    response({
      res,
      statusCode: 500,
    });
  }
};

export default logout;

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: User logout
 *     description: Logout the current user.
 *     tags:
 *       - Auth
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
 *     security:
 *       - APP-AUTH: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       400:
 *         description: NO_REFRESH_TOKEN_PROVIDED
 *       404:
 *         description: REFRESH_TOKEN_NOT_FOUND
 */
