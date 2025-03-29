export const DEFAULT_LANGUAGE = 'el';

export const SUPPORTED_LANGUAGES = [
  {
    name: 'el',
    label: 'Ελληνικά',
  },
  {
    name: 'en',
    label: 'English',
  },
] as const;

export const NAMESPACE = {
  COMMON: 'common',
  HOME: 'home',
  CLIENT_SIDE_COMPONENTS: 'client_side_components',
  LAYOUT: 'layout',
} as const;

export const NAMESPACES_LIST = Array.from(Object.values(NAMESPACE));
