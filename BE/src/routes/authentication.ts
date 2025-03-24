import express from "express";
import { login, logout, register } from "../controllers/authentication";
import { ROUTES } from "../consts";
import { isAuthenticated } from "../middlewares/auth";

export default (router: express.Router) => {
  router.post(`${ROUTES.AUTH}/register`, register);
  router.post(`${ROUTES.AUTH}/login`, login);
  router.post(`${ROUTES.AUTH}/logout`, isAuthenticated, logout);
};

// TODO fix response messages on swagger
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     description: Login with email and password to get a JWT token.
 *     tags:
 *       - Auth
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
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully logged in
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
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "user123"
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: MISSING_REQUIRED_FIELDS
 *       403:
 *         description: INVALID_CREDENTIALS
 *       404:
 *         description: USER_NOT_FOUND
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: User registration
 *     description: Register a new user with email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "your.jwt.token"
 *       400:
 *         description: Missing fields
 *       403:
 *         description: Invalid credentials
 *       409:
 *         description: User already exists
 *
 */
