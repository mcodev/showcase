import { NAMESPACES_LIST } from '@/i18n/consts';
import i18nConfig from '@/i18n/i18nConfig';

export type LanguageType = (typeof i18nConfig.locales)[number];

export type ParamsType = {
  params: Promise<{ locale: LanguageType }>;
};

export type NamespacesType = (typeof NAMESPACES_LIST)[number];

export type TranslationFunctionType = (text: string, options?: any) => string;
