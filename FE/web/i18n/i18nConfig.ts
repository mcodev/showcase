import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES } from './consts';

const i18nConfig = {
  locales: SUPPORTED_LANGUAGES.map((lang) => lang.name),
  defaultLocale: DEFAULT_LANGUAGE,
};

export default i18nConfig;
