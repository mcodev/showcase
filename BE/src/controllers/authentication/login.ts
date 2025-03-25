import express from "express";
import { getUserByEmail } from "../../models/Users";
import { generatePasswordHash } from "../../helpers/generators";
import { response } from "../../helpers/response";
import { ROUTES_NAMES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import { isValidEmail, isValidPassword } from "../../helpers/validators";

const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const expectedHashedPassword = generatePasswordHash(
      user.authentication.salt,
      PASSWORD
    );

    if (
      user.authentication.password !== expectedHashedPassword ||
      !isValidEmail(EMAIL) ||
      !isValidPassword(PASSWORD)
    ) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    response({
      res,
      statusCode: 200,
      route: ROUTES_NAMES.AUTH,
      payload: {
        accessToken,
        refreshToken,
        user: { _id: user._id, name: user.name },
      },
    }).end();
  } catch (error) {
    console.error(error);

    response({
      res,
      statusCode: 500,
    });
  }
};

export default login;

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
 *                     _id:
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
