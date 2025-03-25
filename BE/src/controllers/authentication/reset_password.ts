// export const reset_password = async (
//   req: express.Request,
//   res: express.Response
// ): Promise<void> => {
//   try {
//     const { email, phoneNumber, temporaryResetToken, password } = req.body;

//     // Validate input
//     if ((!email && !phoneNumber) || !temporaryResetToken || !password) {
//       response({
//         res,
//         statusCode: 400,
//         // message: "All fields are required",
//         route: ROUTES_NAMES.AUTH,
//       });
//       return;
//     }

//     // Validate password strength
//     const isValidPassword = (pwd: string) => {
//       const re =
//         /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;
//       return re.test(pwd.trim());
//     };

//     if (!isValidPassword(password)) {
//       response({
//         res,
//         statusCode: 400,
//         // message: "Password does not meet requirements",
//         route: ROUTES_NAMES.AUTH,
//       });
//       return;
//     }

//     // Find user with matching temporary reset token
//     const user = await User.findOne({
//       $or: [{ email }, { phoneNumber }],
//       temporaryResetToken,
//     });

//     if (!user) {
//       response({
//         res,
//         statusCode: 400,
//         // message: "Invalid reset request",
//         route: ROUTES_NAMES.AUTH,
//       });
//       return;
//     }

//     // Hash new password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Update password and clear reset-related fields
//     user.password = hashedPassword;
//     user.resetCode = null;
//     user.resetCodeExpiry = null;
//     user.temporaryResetToken = null;
//     await user.save();

//     response({
//       res,
//       statusCode: 200,
//       // message: "Password successfully reset",
//       route: ROUTES_NAMES.AUTH,
//     });
//   } catch (error) {
//     console.error("Reset Password Error:", error);
//     response({
//       res,
//       statusCode: 500,
//       // message: "Internal server error",
//     });
//   }
// };
