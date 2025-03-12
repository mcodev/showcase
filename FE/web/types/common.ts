import i18nConfig from '@/i18n/i18nConfig';
import { NAMESPACES_LIST } from '@/i18n/namespaces';

export type LanguageType = (typeof i18nConfig.locales)[number];

export type ParamsType = {
  params: { locale: LanguageType };
};

export type NamespacesType = (typeof NAMESPACES_LIST)[number];
