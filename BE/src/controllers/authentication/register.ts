import express from "express";
import { createUser, getUserByEmail } from "../../models/Users";
import { generateEncryptedPassword } from "../../helpers/generators";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../helpers/validators";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.REGISTER;

const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { name, email, password } = req.body;

    const NAME = name?.trim();
    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!name) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_NAME,
      });
    }

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

    if (!isValidName(NAME)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_NAME,
      });
    }

    if (!isValidEmail(EMAIL)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_EMAIL,
      });
    }

    if (!isValidPassword(PASSWORD)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_PASSWORD,
      });
    }

    const userCheck = await getUserByEmail(email);

    const isUserAlreadyRegistered = Boolean(userCheck);

    if (isUserAlreadyRegistered) {
      response({
        res,
        statusCode: 409,
        message: RESPONSE_MESSAGE[409],
      });
    }

    const encryptedPassword = await generateEncryptedPassword(PASSWORD);

    const user = await createUser({
      name: NAME,
      email: EMAIL,
      password: encryptedPassword,
    });

    if (!user) {
      response({
        res,
        statusCode: 500,
      });
    }

    // Generate JWT tokens
    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    if (!accessToken || !refreshToken) {
      response({
        res,
        statusCode: 500,
      });
    }

    response({
      res,
      statusCode: 201,
      message: RESPONSE_MESSAGE[201],
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

export default register;

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
 *       201:
 *         description: USER_CREATED
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
 *         description: MISSING_NAME | MISSING_EMAIL | MISSING_PASSWORD
 *       403:
 *         description: INVALID_NAME | INVALID_EMAIL | INVALID_PASSWORD
 *       409:
 *         description: USER_ALREADY_REGISTERED
 *
 */
