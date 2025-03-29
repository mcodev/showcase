import express from "express";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import {
  isValidResetCode,
  isVerificationCodeMatch,
} from "../../helpers/validators";
import { getUserByEmail } from "../../models/Users";
import { generateTempResetToken } from "../../helpers/tokens";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.VERIFY_RESET_CODE;

export const verify_reset_code = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { resetCode, email } = req.body;

    if (!resetCode) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404].RESET_CODE_NOT_FOUND,
      });
      return;
    }

    if (!isValidResetCode(resetCode)) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].INVALID_RESET_CODE,
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

    const user = await getUserByEmail(email);

    if (!user) {
      response({
        res,
        statusCode: 404,
        message: RESPONSE_MESSAGE[404].USER_NOT_FOUND,
      });
      return;
    }

    const expirationDate = new Date(user.resetCodeExpiry);
    const now = new Date();

    if (now > expirationDate) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].RESET_CODE_EXPIRED,
      });
      return;
    }

    if (!isVerificationCodeMatch(resetCode, user.resetCode)) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].INVALID_RESET_CODE,
      });
      return;
    }

    const temporaryResetToken = generateTempResetToken(user.email);

    user.temporaryResetToken = temporaryResetToken;
    await user.save();

    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    response({
      res,
      statusCode: 200,
      payload: {
        temporaryResetToken,
      },
    });
  } catch (error) {
    console.error("Verify Reset Code Error:", error);
    response({
      res,
      statusCode: 500,
    });
  }
};

/**
 * @swagger
 * /auth/verify_reset_code:
 *   post:
 *     summary: Verify reset code
 *     description: Verifies the reset code and generates a temporary reset token for the user.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               resetCode:
 *                 type: string
 *                 example: "your-reset-code"
 *               email:
 *                 type: string
 *                 example: "user@example.com"
 *             required:
 *               - resetCode
 *               - email
 *
 *     responses:
 *       200:
 *         description: Successfully verified reset code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 temporaryResetToken:
 *                   type: string
 *                   example: "your-temporary-reset-token"
 *       400:
 *         description: INVALID_RESET_CODE , RESET_CODE_EXPIRED
 *       404:
 *         description: RESET_CODE_NOT_FOUND , USER_NOT_FOUND, MISSING_EMAIL
 */
