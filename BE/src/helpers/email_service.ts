import nodemailer from "nodemailer";

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string
): Promise<boolean> => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Your password reset code is: ${resetCode}. This code will expire soon.`,
      html: `<p>Your password reset code is: <strong>${resetCode}</strong>. This code will expire soon.</p>`,
    };

    const response = await transporter.sendMail(mailOptions);

    return Boolean(response.messageId);
  } catch (error) {
    console.error("Error sending password reset email:", error);
  }
};
