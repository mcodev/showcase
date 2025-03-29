import { RESEND_API_KEY } from "../consts";
import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 587,
      secure: false,
      auth: {
        user: RESEND_API_KEY,
        pass: "",
      },
    });

    // Send according to user language TODO implement in FE

    const mailOptions = {
      from: "Showcase App",
      to: email,
      subject: "Password Reset Code",
      html: `<p>Your password reset code is: <strong>${resetCode}</strong>. This code will expire soon.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    if (!info?.messageId) {
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error sending password reset email:", error);
    return false;
  }
};
