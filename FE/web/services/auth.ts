export const LOGIN_SERVICE = {
  path: 'auth/login',
  method: 'POST',
  errors: [
    {
      code: 400,
      message: 'MISSING_REQUIRED_FIELDS',
    },
    {
      code: 403,
      message: 'INVALID_CREDENTIALS',
    },
    {
      code: 404,
      message: 'USER_NOT_FOUND',
    },
  ],
};

export const SIGN_UP_SERVICE = {
  path: 'auth/register',
  method: 'POST',
  errors: [
    {
      code: 400,
      message: 'MISSING_REQUIRED_FIELDS',
    },
    {
      code: 403,
      message: 'INVALID_CREDENTIALS',
    },
    {
      code: 409,
      message: 'USER_ALREADY_REGISTERED',
    },
  ],
};

export const LOGOUT_SERVICE = {
  path: 'auth/logout',
  method: 'POST',
  errors: [],
};

export const FORGOT_PASSWORD_SERVICE = {
  path: 'auth/request_password_reset',
  method: 'POST',
  errors: [
    {
      code: 400,
      message: 'MISSING_REQUIRED_FIELDS',
    },
    {
      code: 403,
      message: 'INVALID_CREDENTIALS',
    },
    {
      code: 404,
      message: 'USER_NOT_FOUND',
    },
  ],
};
