import { RESEND_API_KEY } from "../consts";
import nodemailer from "nodemailer";
import { getEmailTemplate } from "./email_template";

type LanguageType = "el" | "en";

const DEFAULT_LANGUAGE = "el";

const getEmailData = (resetCode: string, language: LanguageType) => {
  const subject = {
    el: "Pin Αλλαγής Κωδικού",
    en: "Password Reset Code",
  };

  const html = getEmailTemplate(language, resetCode);

  return {
    subject: subject[language || DEFAULT_LANGUAGE],
    html: html,
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
