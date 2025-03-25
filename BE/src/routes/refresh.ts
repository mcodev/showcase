import express from "express";
import { ROUTES } from "../consts";
import { refresh } from "../controllers/refresh/refresh";

export default (router: express.Router) => {
  router.post(`${ROUTES.REFRESH}`, refresh);
};

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
