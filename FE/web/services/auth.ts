export const LOGIN_SERVICE = {
  path: 'auth/login',
  method: 'POST',
  errors: [
    {
      code: 400,
      message: 'user_not_found',
    },
    {
      code: 403,
      message: 'incorrect_credentials',
    },
    {
      code: 404,
      message: 'user_not_found',
    },
  ],
};

export const SIGN_UP_SERVICE = {
  path: 'auth/signup',
  method: 'POST',
  errors: [
    {
      code: 400,
      message: 'missing_required_fields',
    },
    {
      code: 409,
      message: 'user_already_registered',
    },
  ],
};
