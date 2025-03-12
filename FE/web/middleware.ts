import { i18nRouter } from 'next-i18n-router';
import i18nConfig from './i18n/i18nConfig';

export const middleware = (req: any) => {
  return i18nRouter(req, i18nConfig);
};

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
