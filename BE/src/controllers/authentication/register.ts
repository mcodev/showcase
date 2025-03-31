import express from "express";
import {
  createUser,
  getUserByEmail,
  getUserByUserName,
} from "../../models/Users";
import { generateEncryptedPassword } from "../../helpers/generators";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import {
  isValidEmail,
  isValidUsername,
  isValidPassword,
} from "../../helpers/validators";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.REGISTER;

const register = async (
  req: express.Request,
  res: express.Response
): Promise<any> => {
  try {
    const { username, email, password } = req.body;

    const USERNAME = username?.trim();
    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!username) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_USERNAME,
      });

      return;
    }

    const existingUserName = getUserByUserName(USERNAME);

    if (existingUserName) {
      response({
        res,
        statusCode: 409,
        message: RESPONSE_MESSAGE[409].USERNAME_IN_NOT_UNIQUE,
      });

      return;
    }

    if (!email) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_EMAIL,
      });

      return;
    }

    if (!password) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_PASSWORD,
      });

      return;
    }

    if (!isValidUsername(USERNAME)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_USERNAME,
      });

      return;
    }

    if (!isValidEmail(EMAIL)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_EMAIL,
      });

      return;
    }

    if (!isValidPassword(PASSWORD)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403].INVALID_PASSWORD,
      });

      return;
    }

    const userCheck = await getUserByEmail(email);

    const isUserAlreadyRegistered = Boolean(userCheck);

    if (isUserAlreadyRegistered) {
      response({
        res,
        statusCode: 409,
        message: RESPONSE_MESSAGE[409].USER_ALREADY_REGISTERED,
      });

      return;
    }

    const encryptedPassword = await generateEncryptedPassword(PASSWORD);

    const user = await createUser({
      username: USERNAME,
      email: EMAIL,
      password: encryptedPassword,
    });

    if (!user) {
      response({
        res,
        statusCode: 500,
      });

      return;
    }

    const accessToken = generateAccessToken(String(user._id));
    const refreshToken = await generateRefreshToken(String(user._id));

    if (!accessToken || !refreshToken) {
      response({
        res,
        statusCode: 500,
      });

      return;
    }

    response({
      res,
      statusCode: 201,
      message: RESPONSE_MESSAGE[201],
      payload: {
        accessToken,
        refreshToken,
        user: { _id: user._id, username: user.username },
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
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
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
 *                     username:
 *                       type: string
 *                       example: "John Doe"
 *       400:
 *         description: MISSING_USERNAME , MISSING_EMAIL , MISSING_PASSWORD
 *       403:
 *         description: INVALID_USERNAME , INVALID_EMAIL , INVALID_PASSWORD
 *       409:
 *         description: USER_ALREADY_REGISTERED, USERNAME_IN_NOT_UNIQUE
 *
 */
