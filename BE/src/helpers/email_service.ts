import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail", // or use a custom SMTP server
      auth: {
        user: process.env.EMAIL_USER, // ✅ Environment variable
        pass: process.env.EMAIL_PASS, // ✅ Environment variable
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset code is: ${resetCode}. This code will expire soon.`,
    };

    const response = await transporter.sendMail(mailOptions);

    return Boolean(response.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
