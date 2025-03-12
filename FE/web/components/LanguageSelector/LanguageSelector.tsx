'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGES } from '@/i18n/consts';
import i18nConfig from '../../i18n/i18nConfig';

export default function LanguageChanger() {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const currentPathname = usePathname();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = e.target.value;

    // Set persistent cookie for next-i18n-router
    document.cookie = `NEXT_LOCALE=${newLocale}; Max-Age=315360000; Path=/`;

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
    <select onChange={handleChange} value={currentLocale}>
      {SUPPORTED_LANGUAGES.map((lang) => (
        <option key={lang.name} value={lang.name}>
          {lang.label}
        </option>
      ))}
    </select>
  );
}
