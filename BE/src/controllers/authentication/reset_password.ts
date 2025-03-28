import express from "express";
import { response } from "../../helpers/response";
import { RESPONSE_MESSAGES } from "../../consts";

const RESPONSE_MESSAGE = RESPONSE_MESSAGES.REQUEST_PASSWORD_RESET;

export const reset_password = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { code } = req.body;

    // if (!code) {
    //   response({
    //     res,
    //     statusCode: 400,
    //     // message: "All fields are required",
    //   });
    //   return;
    // }

    // if (!isValidPassword(password)) {
    //   response({
    //     res,
    //     statusCode: 400,
    //     // message: "Password does not meet requirements",
    //     route: ROUTES_NAMES.AUTH,
    //   });
    //   return;
    // }

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
      // message: "Internal server error",
    });
  }
};
