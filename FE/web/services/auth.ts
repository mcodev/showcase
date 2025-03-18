import request from './api';
import { LoginFormType, RegisterFormType } from './payloadTypes';

const postAuthLogin = async ({ email, password }: LoginFormType) => {
  const res = await request('auth/login', 'POST', { email, password });

  console.log('res', res);

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
