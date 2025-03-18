import request from './api';

const postAuthLogin = async (email: string, password: string) => {
  const res = await request('auth/login', 'POST', { email, password });

  return res;
};

const postAuthRegister = async (name: string, email: string, password: string) => {
  const res = await request('auth/register', 'POST', { name, email, password });

  return res;
};

const AUTH = {
  LOGIN_USER: postAuthLogin,
  REGISTER_USER: postAuthRegister,
};

export default AUTH;
