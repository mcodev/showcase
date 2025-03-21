import { LOGIN_SERVICE, SIGN_UP_SERVICE } from './auth';

export const PROTECTED_ROUTES = [LOGIN_SERVICE.path];

export const SERVICES = { LOGIN_SERVICE, SIGN_UP_SERVICE };

export type ServicesSelectorType = keyof typeof SERVICES;
