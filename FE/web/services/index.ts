import {
  FORGOT_PASSWORD_SERVICE,
  LOGIN_SERVICE,
  LOGOUT_SERVICE,
  RESET_CODE_VERIFICATION_SERVICE,
  SIGN_UP_SERVICE,
} from './auth';

type ServiceType = {
  [key in keyof typeof SERVICES]: ServicesSelectorType;
};

export const SERVICES = {
  LOGIN_SERVICE,
  SIGN_UP_SERVICE,
  LOGOUT_SERVICE,
  FORGOT_PASSWORD_SERVICE,
  RESET_CODE_VERIFICATION_SERVICE,
};

export const SERVICE = Object.keys(SERVICES).reduce((acc, key) => {
  acc[key as ServicesSelectorType] = key as ServicesSelectorType;
  return acc;
}, {} as ServiceType);

export type ServicesSelectorType = keyof typeof SERVICES;

export const PROTECTED_ROUTES = [SERVICE.LOGOUT_SERVICE];
