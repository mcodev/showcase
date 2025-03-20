import { LOGIN_SERVICE, SIGN_UP_SERVICE } from './auth';

export const SERVICES = { LOGIN_SERVICE, SIGN_UP_SERVICE };

export type ServicesSelectorType = keyof typeof SERVICES;
