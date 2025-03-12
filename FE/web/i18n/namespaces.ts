export const NAMESPACE = {
  COMMON: 'common',
  HOME: 'home',
} as const;

export const NAMESPACES_LIST = Array.from(Object.values(NAMESPACE));
