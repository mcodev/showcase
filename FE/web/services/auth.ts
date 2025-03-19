import request from './api';
import { AUTH_ERRORS, GLOBAL_ERRORS } from './errors';
import { LoginFormType, RegisterFormType } from './payloadTypes';
import { LoginResponseDataType } from './responseTypes';

const postAuthLogin = async ({
  email,
  password,
}: LoginFormType): Promise<LoginResponseDataType | null> => {
  const res = await request('auth/login', 'POST', { email, password });

  if (!res.success) {
    switch (res.statusCode) {
      case 400:
        throw new Error(AUTH_ERRORS.MISSING_REQUIRED_FIELDS);
      case 403:
        throw new Error(AUTH_ERRORS.INCORRECT_CREDENTIALS);
      case 404:
        throw new Error(AUTH_ERRORS.USER_NOT_FOUND);
      default:
        throw new Error(GLOBAL_ERRORS.UNEXPECTED_ERROR);
    }
  }

  return res.data;
};

const postAuthRegister = async ({ name, email, password }: RegisterFormType) => {
  const res = await request('auth/register', 'POST', { name, email, password });

  return res;
};

const AUTH = {
  LOGIN_USER: postAuthLogin,
  REGISTER_USER: postAuthRegister,
};

export default AUTH;
