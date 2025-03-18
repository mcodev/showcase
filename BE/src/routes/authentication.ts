import express from "express";
import { login, register } from "../controllers/authentication";
import { ROUTES } from "../consts";

export default (router: express.Router) => {
  router.post(`${ROUTES.AUTH}/register`, register);
  router.post(`${ROUTES.AUTH}/login`, login);
};

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login with email and password to get a JWT token.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "your.jwt.token"
 *       400:
 *         description: Invalid email or password
 */
