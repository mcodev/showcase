import bcrypt from "bcrypt";

export const isValidName = (username: string) => {
  const re = /^[A-Za-z ]{3,15}$/;

  return re.test(username.trim());
};

export const isValidEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase().trim());
};

export const isValidPassword = (password: string) => {
  const re =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,}$/;

  return re.test(password.trim());
};

export const isUserPasswordMatch = async (
  password: string,
  encryptedPassword: string
) => {
  return await bcrypt.compare(password, encryptedPassword);
};

export const isVerificationCodeMatch = async (
  verificationCode: string,
  encryptedVerificationCode: string
) => {
  return await bcrypt.compare(verificationCode, encryptedVerificationCode);
};

export const isValidResetCode = (resetCode: string) => {
  return resetCode.length === 5 && !isNaN(parseInt(resetCode));
};
