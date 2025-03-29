import * as AUTH_SERVICES from './auth';

type ServiceType = {
  [key in keyof typeof SERVICES]: ServicesSelectorType;
};

export const SERVICES = {
  ...AUTH_SERVICES,
};

export const SERVICE = Object.keys(SERVICES).reduce((acc, key) => {
  acc[key as ServicesSelectorType] = key as ServicesSelectorType;
  return acc;
}, {} as ServiceType);

export type ServicesSelectorType = keyof typeof SERVICES;

export const PROTECTED_ROUTES = [SERVICE.LOGOUT_SERVICE];
