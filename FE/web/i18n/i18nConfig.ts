import { SUPPORTED_LANGUAGES } from './consts';

const i18nConfig = {
  locales: SUPPORTED_LANGUAGES.map((lang) => lang.name),
  defaultLocale: SUPPORTED_LANGUAGES[0].name,
};

export default i18nConfig;
