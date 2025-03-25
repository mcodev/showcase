import express from "express";
import { response } from "../../common";
import { ROUTES_NAMES } from "../../consts";
import { RefreshToken } from "../../models/RefreshToken";

const logout = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    const deletedToken = await RefreshToken.deleteOne({
      token: refreshToken,
    });

    if (deletedToken.deletedCount === 0) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
        customMessage: "REFRESH_TOKEN_NOT_FOUND",
      });
    }

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.AUTH,
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
 *       404:
 *         description: REFRESH_TOKEN_NOT_FOUND
 */
