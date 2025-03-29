import { RESEND_API_KEY } from "../consts";
import nodemailer from "nodemailer";

type LanguageType = "el" | "en";

const DEFAULT_LANGUAGE = "el";

const getEmailData = (resetCode: string, language: LanguageType) => {
  const subject = {
    el: "Κωδικός Αλλαγής Κωδικού",
    en: "Password Reset Code",
  };

  const html = {
    el: `<p>Κωδικός αλλαγής κωδικού: <strong>${resetCode}</strong>. Αυτός ο κωδικός θα λήξει σύντομα.</p>`,
    en: `<p>Your password reset code is: <strong>${resetCode}</strong>. This code will expire soon.</p>`,
  };

  return {
    subject: subject[language || DEFAULT_LANGUAGE],
    html: html[language || DEFAULT_LANGUAGE],
  };
};

export const sendPasswordResetEmail = async (
  email: string,
  resetCode: string,
  language: LanguageType
): Promise<boolean> => {
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

    // https://www.youtube.com/watch?v=cqdAS49RthQ
    // try to fix gmail

    const mailOptions = {
      from: "onboarding@resend.dev",
      to: email,
      subject: getEmailData(resetCode, language).subject,
      html: getEmailData(resetCode, language).html,
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
