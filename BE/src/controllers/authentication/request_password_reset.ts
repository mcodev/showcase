import express from "express";
import { response } from "../../helpers/response";
import { RESET_CODE_EXPIRY, ROUTES_NAMES } from "../../consts";
import { getUserByEmail } from "../../models/Users";
import { isValidEmail } from "../../helpers/validators";
import { generateResetCode } from "../../helpers/generators";

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

    const resetCode = generateResetCode();

    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    // Set code expiry
    const resetCodeExpiry = new Date(Date.now() + RESET_CODE_EXPIRY);

    // Update user with reset code and expiry
    user.resetCode = hashedResetCode;
    user.resetCodeExpiry = resetCodeExpiry;
    await user.save();

    sendPasswordResetEmail(email, {
      resetCode: resetCode,
      resetCodeExpiry: resetCodeExpiry,
    });

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
