import express from "express";
import { response } from "../../helpers/response";
import { RESET_CODE_EXPIRY, ROUTES_NAMES } from "../../consts";
import { getUserByEmail, updateUser } from "../../models/Users";
import { isValidEmail } from "../../helpers/validators";
import {
  generate5DigitResetCode,
  generateEncryptedPassword,
} from "../../helpers/generators";
import { sendPasswordResetEmail } from "../../helpers/email_service";

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
        route: ROUTES_NAMES.AUTH,
      });
    }

    if (!isValidEmail(email)) {
      response({
        res,
        statusCode: 403,
        route: ROUTES_NAMES.AUTH,
      });
    }

    const user = await getUserByEmail(email);

    if (!user) {
      response({
        res,
        statusCode: 404,
        route: ROUTES_NAMES.AUTH,
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
    console.error("Request Password Reset Error:", error);

    response({
      res,
      statusCode: 500,
    });
  }
};

export default request_password_reset;
