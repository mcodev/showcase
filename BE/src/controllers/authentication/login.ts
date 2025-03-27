import express from "express";
import { getUserByEmail } from "../../models/Users";
import { isUserPasswordMatch } from "../../helpers/validators";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import { isValidEmail, isValidPassword } from "../../helpers/validators";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.LOGIN;

const login = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!email) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_EMAIL,
      });
    }

    if (!password) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_PASSWORD,
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404],
      });
    }

    if (
      !isUserPasswordMatch(PASSWORD, user.password) ||
      !isValidPassword(PASSWORD)
    ) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_PASSWORD,
      });
    }

    if (!isValidEmail(EMAIL)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_EMAIL,
      });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    response({
      res,
      statusCode: 200,
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
 *         description: MISSING_EMAIL | MISSING_PASSWORD
 *       403:
 *         description: INVALID_EMAIL | INVALID_PASSWORD
 *       404:
 *         description: USER_NOT_FOUND
 */
