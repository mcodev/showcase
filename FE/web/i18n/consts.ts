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
} as const;

export const NAMESPACES_LIST = Array.from(Object.values(NAMESPACE));
