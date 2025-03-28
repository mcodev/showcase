export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordFormType = {
  email: string;
};

export type ResetCodeVerificationFormType = {
  resetCode: string;
};

export type ChangePasswordFormType = {
  password: string;
  repeatPassword: string;
};
