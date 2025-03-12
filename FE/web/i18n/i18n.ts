/* eslint-disable no-param-reassign */
import { createInstance, i18n, Resource } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';
import { LanguageType, NamespacesType } from '@/types/common';
import i18nConfig from './i18nConfig';

export default async function initTranslations(
  locale: LanguageType,
  namespaces: NamespacesType[] | NamespacesType,
  i18nInstance?: i18n,
  resources?: Resource
): Promise<{ i18n: i18n; resources: Record<string, any>; t: i18n['t'] }> {
  i18nInstance = i18nInstance || createInstance();

  i18nInstance.use(initReactI18next);

  if (!resources) {
    i18nInstance.use(
      resourcesToBackend(
        (language: LanguageType, namespace: string) =>
          import(`./translations/${language}/${namespace}.json`)
      )
    );
  }

  await i18nInstance.init({
    lng: locale,
    resources,
    fallbackLng: i18nConfig.defaultLocale,
    supportedLngs: i18nConfig.locales,
    defaultNS: typeof namespaces === 'string' ? namespaces : namespaces[0],
    fallbackNS: typeof namespaces === 'string' ? namespaces : namespaces[0],
    ns: namespaces,
    preload: resources ? [] : i18nConfig.locales,
  });

  return {
    i18n: i18nInstance,
    resources: { [locale]: i18nInstance.services.resourceStore.data[locale] },
    t: i18nInstance.t,
  };
}
