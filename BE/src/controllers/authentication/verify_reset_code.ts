export const verify_reset_code = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, phoneNumber, resetCode } = req.body;

    // Validate input
    if ((!email && !phoneNumber) || !resetCode) {
      response({
        res,
        statusCode: 400,
        // message: "Email/Phone and reset code are required",
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    // Hash the incoming reset code
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");

    // Find user with matching reset code and check expiry
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
      resetCode: hashedResetCode,
      resetCodeExpiry: { $gt: new Date() },
    });

    if (!user) {
      response({
        res,
        statusCode: 400,
        // message: "Invalid or expired reset code",
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    // Code is valid, generate a temporary token for password reset
    const temporaryResetToken = crypto.randomBytes(32).toString("hex");

    user.temporaryResetToken = temporaryResetToken;
    await user.save();

    response({
      res,
      statusCode: 200,
      // message: "Reset code verified",
      data: {
        temporaryResetToken,
      },
      route: ROUTES_NAMES.AUTH,
    });
  } catch (error) {
    console.error("Verify Reset Code Error:", error);
    response({
      res,
      statusCode: 500,
      // message: "Internal server error",
    });
  }
};
