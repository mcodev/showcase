import express from "express";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";
import { isValidPassword } from "../../helpers/validators";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.RESET_PASSWORD;

export const reset_password = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { password, temporaryResetToken } = req.body;

    // TODO check how its stored the reset token and get the user accordingly

    if (!password) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_PASSWORD,
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

    if (!temporaryResetToken) {
      response({
        res,
        statusCode: 400,
        message: RESPONSE_MESSAGE[400].MISSING_TEMPORARY_RESET_TOKEN,
      });
      return;
    }

    // const user = await getUserByResetCode(temporaryResetToken);

    // // Find user with matching temporary reset token
    // const user = await User.findOne({
    //   $or: [{ email }, { phoneNumber }],
    //   temporaryResetToken,
    // });

    // if (!user) {
    //   response({
    //     res,
    //     statusCode: 400,
    //     // message: "Invalid reset request",
    //     route: ROUTES_NAMES.AUTH,
    //   });
    //   return;
    // }

    // // Hash new password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // // Update password and clear reset-related fields
    // user.password = hashedPassword;
    // user.resetCode = null;
    // user.resetCodeExpiry = null;
    // user.temporaryResetToken = null;
    // await user.save();

    // response({
    //   res,
    //   statusCode: 200,
    //   // message: "Password successfully reset",
    //   route: ROUTES_NAMES.AUTH,
    // });
  } catch (error) {
    console.error("Reset Password Error:", error);
    response({
      res,
      statusCode: 500,
    });
  }
};
