'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Select } from '@mantine/core';
import { SUPPORTED_LANGUAGES } from '@/i18n/consts';
import i18nConfig from '../../i18n/i18nConfig';

const FORMATTED_LANGUAGES = SUPPORTED_LANGUAGES.map((lang) => {
  return {
    value: lang.name,
    label: lang.label,
  };
});

export default function LanguageChanger() {
  const { i18n, t } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (newLocale: string | null) => {
    if (!newLocale || newLocale === currentLocale) {
      return;
    }

    // Set persistent cookie for next-i18n-router if when redirect the language does not persist
    // document.cookie = `NEXT_LOCALE=${newLocale}; Max-Age=315360000; Path=/`;

    // Redirect to the new locale path
    let newPath = currentPathname;

    if (currentLocale === i18nConfig.defaultLocale) {
      newPath = `/${newLocale}${currentPathname}`;
    } else {
      newPath = currentPathname.replace(new RegExp(`^/${currentLocale}`), `/${newLocale}`);
    }

    router.push(newPath);
    router.refresh();
  };

  return (
    <Select
      value={currentLocale}
      data={FORMATTED_LANGUAGES}
      onChange={handleChange}
      label={t('language')}
    />
  );
}
