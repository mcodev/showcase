import request from './api';
import { GLOBAL_ERRORS } from './errors';
import { LoginFormType, RegisterFormType } from './payloadTypes';

const postAuthLogin = async ({ email, password }: LoginFormType) => {
  const res = await request('auth/login', 'POST', { email, password });

  if (!res.success) {
    switch (res.statusCode) {
      case 400:
        break;

      default:
        throw new Error(GLOBAL_ERRORS.UNEXPECTED_ERROR);
    }
  }

  return res;
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
