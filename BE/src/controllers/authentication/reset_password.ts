import express from "express";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import { isValidEmail, isValidPassword } from "../../helpers/validators";
import { getUserByEmail, updateUser } from "../../models/Users";
import jwt from "jsonwebtoken";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.RESET_PASSWORD;

export const reset_password = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { password, temporaryResetToken, email } = req.body;

    if (!password) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404].MISSING_PASSWORD,
      });
      return;
    }

    if (!temporaryResetToken) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404].MISSING_TEMPORARY_RESET_TOKEN,
      });
      return;
    }

    if (!email) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404].MISSING_EMAIL,
      });
      return;
    }

    if (!isValidEmail(email)) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].INVALID_EMAIL,
      });
      return;
    }

    if (!isValidPassword(password)) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].INVALID_PASSWORD,
      });
      return;
    }

    const user = await getUserByEmail(email);

    jwt.verify(
      user.temporaryResetToken,
      process.env.ACCESS_TOKEN_SECRET as string,
      (err) => {
        if (err) {
          response({
            res,
            statusCode: 400,
            message: RESPONSE_MESSAGE[400].INVALID_TEMP_RESET_TOKEN,
          });

          return;
        }
      }
    );

    await updateUser(String(user._id), {
      password,
      temporaryResetToken: null,
    });

    response({
      res,
      statusCode: 200,
    });
  } catch (error) {
    console.error("Reset Password Error:", error);
    response({
      res,
      statusCode: 500,
    });
  }
};

/**
 * @swagger
 * /auth/reset_password:
 *   post:
 *     summary: Reset password
 *     description: Resets the user's password using a temporary reset token.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: "newPassword123"
 *               temporaryResetToken:
 *                 type: string
 *                 example: "your-temporary-reset-token"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *             required:
 *               - password
 *               - temporaryResetToken
 *               - email
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: INVALID_PASSWORD , INVALID_TEMP_RESET_TOKEN , INVALID_EMAIL
 *       404:
 *         description: MISSING_TEMPORARY_RESET_TOKEN , MISSING_EMAIL , MISSING_PASSWORD , RESET_CODE_NOT_FOUND , USER_NOT_FOUND
 */
