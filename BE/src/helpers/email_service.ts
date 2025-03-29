import { RESEND_API_KEY } from "../consts";
import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<boolean> => {
  console.log(RESEND_API_KEY);

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: {
        user: "resend",
        pass: RESEND_API_KEY,
      },
    });

    // Send according to user language TODO implement in FE

    // https://www.youtube.com/watch?v=cqdAS49RthQ
    // try to fix gmail

    const mailOptions = {
      from: "onboarding@resend.dev",
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
