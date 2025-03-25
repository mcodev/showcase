import express from "express";
import { createUser, getUserByEmail } from "../../models/Users";
import { authentication, random } from "../../helpers/functions";
import { response } from "../../helpers/response";
import { ROUTES_NAMES } from "../../consts";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../helpers/tokens";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
} from "../../helpers/validators";

const register = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const NAME = name?.trim();
    const EMAIL = email?.trim();
    const PASSWORD = password?.trim();

    if (!name || !email || !password) {
      response({
        res,
        statusCode: 400,
        route: ROUTES_NAMES.AUTH,
      });
    }

    if (
      !isValidName(NAME) ||
      !isValidEmail(EMAIL) ||
      !isValidPassword(PASSWORD)
    ) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const isUserAlreadyRegistered = await getUserByEmail(email);

    if (isUserAlreadyRegistered) {
      response({
        res,
        statusCode: 409,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const salt = random();

    const user = await createUser({
      name: NAME,
      email: EMAIL,
      authentication: {
        salt,
        password: authentication(salt, PASSWORD),
      },
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
 *         description: Successfully registered
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
 *       409:
 *         description: USER_ALREADY_REGISTERED
 *
 */
