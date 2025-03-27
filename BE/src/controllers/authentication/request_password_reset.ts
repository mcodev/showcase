import express from "express";
import { response } from "../../helpers/response";
import { RESET_CODE_EXPIRY, RESPONSE_MESSAGES } from "../../consts";
import { getUserByEmail, updateUser } from "../../models/Users";
import { isValidEmail } from "../../helpers/validators";
import {
  generate5DigitResetCode,
  generateEncryptedPassword,
} from "../../helpers/generators";
import { sendPasswordResetEmail } from "../../helpers/email_service";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.REQUEST_PASSWORD_RESET;

const request_password_reset = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email } = req.body;

    if (!email) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400],
      });
    }

    if (!isValidEmail(email)) {
      response({
        res,
        statusCode: 403,
        message: RESPONSE_MESSAGE[403],
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

    const resetCode = generate5DigitResetCode();

    const hashedResetCode = await generateEncryptedPassword(resetCode);

    const resetCodeExpiry = new Date(Date.now() + RESET_CODE_EXPIRY);

    const isUserUpdated = await updateUser(String(user._id), {
      resetCode: hashedResetCode,
      resetCodeExpiry: resetCodeExpiry,
    });

    if (!isUserUpdated) {
      response({
        res,
        statusCode: 500,
      });
    }

    const isEmailSent = await sendPasswordResetEmail(email, resetCode);

    if (!isEmailSent) {
      response({
        res,
        statusCode: 500,
      });
    }

    response({
      res,
      statusCode: 200,
    });
  } catch (error) {
    response({
      res,
      statusCode: 500,
    });
  }
};

export default request_password_reset;

/**
 * @swagger
 * /auth/request_password_reset:
 *   post:
 *     summary: Request a password reset
 *     description: Sends a password reset code to the user's email if the email exists in the system.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "user@example.com"
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset request successful. Reset code sent to email.
 *       400:
 *         description: MISSING_REQUIRED_FIELDS
 *       403:
 *         description: INVALID_CREDENTIALS
 *       404:
 *         description: USER_NOT_FOUND
 */
