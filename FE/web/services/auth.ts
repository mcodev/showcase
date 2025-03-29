export const LOGIN_SERVICE = {
  path: 'auth/login',
  method: 'POST',
  errorCodes: [400, 403, 404],
};

export const SIGN_UP_SERVICE = {
  path: 'auth/register',
  method: 'POST',
  errorCodes: [400, 403, 409],
};

export const LOGOUT_SERVICE = {
  path: 'auth/logout',
  method: 'POST',
  errorCodes: [],
};

export const FORGOT_PASSWORD_SERVICE = {
  path: 'auth/request_password_reset',
  method: 'POST',
  errorCodes: [400, 403, 404],
};

export const RESET_CODE_VERIFICATION_SERVICE = {
  path: 'auth/verify_reset_code',
  method: 'POST',
  errorCodes: [400, 404],
};

export const RESET_PASSWORD_SERVICE = {
  path: 'auth/reset_password',
  method: 'POST',
  errorCodes: [400, 404],
};
