export const request_password_reset = async (
  req: express.Request,
  res: express.Response
): Promise<void> => {
  try {
    const { email, phoneNumber } = req.body;

    // Validate email or phone number is provided
    if (!email && !phoneNumber) {
      response({
        res,
        statusCode: 400,
        // message: "Email or phone number is required",
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    // Find user by email or phone number
    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }],
    });

    if (!user) {
      response({
        res,
        statusCode: 404,
        // message: "User not found",
        route: ROUTES_NAMES.AUTH,
      });
      return;
    }

    // Generate reset code
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

    // Send reset code via SMS or email
    if (phoneNumber) {
      await sendPasswordResetSMS(phoneNumber, {
        resetCode: resetCode,
      });
    } else {
      // Fallback to email if no phone number
      await sendPasswordResetEmail(email, {
        resetCode: resetCode,
      });
    }

    response({
      res,
      statusCode: 200,
      // message: "Password reset code sent",
      route: ROUTES_NAMES.AUTH,
    });
  } catch (error) {
    console.error("Request Password Reset Error:", error);
    response({
      res,
      statusCode: 500,
      // message: "Internal server error",
    });
  }
};
