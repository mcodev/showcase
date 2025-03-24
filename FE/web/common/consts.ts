export const DEFAULT_THEME = 'dark';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  DASHBOARD: '/dashboard',
  NEWS: '/news',
};

export const NAVBAR_ROUTES = [
  {
    transKey: 'home',
    href: ROUTES.HOME,
  },
  {
    transKey: 'news',
    href: ROUTES.NEWS,
  },
];

export const REFRESH_TOKEN_KEY = 'rt';
