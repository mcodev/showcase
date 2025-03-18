import express from "express";
import authentication from "./authentication";
import users from "./users";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  users(router);

  return router;
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
