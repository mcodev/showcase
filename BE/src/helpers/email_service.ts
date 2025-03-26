import { EMAIL_PASS, EMAIL_USER } from "../consts";
import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      port: 465,
      host: "smtp.gmail.com",
      secure: true,
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset code is: ${resetCode}. This code will expire soon.`,
      html: `<p>Your password reset code is: <strong>${resetCode}</strong>. This code will expire soon.</p>`,
    };

    console.log("Sending password reset email to:", email);

    const response = await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending password reset email:", error);
      }

      return info;
    });

    // if (response) {
    //   console.log("Password reset email sent successfully:", response);
    //   return true;
    // }

    // return false;
    return false;
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
