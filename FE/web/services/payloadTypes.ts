export type LoginFormType = {
  email: string;
  password: string;
};

export type RegisterFormType = {
  name: string;
  email: string;
  password: string;
};

export type ResetPasswordFormType = {
  email: string;
};

export type ChangePasswordFormType = {
  password: string;
  repeatPassword: string;
};
