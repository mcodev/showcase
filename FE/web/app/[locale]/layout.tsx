import '@mantine/core/styles.css';
import '@/styles/global.css';

import React from 'react';
import { dir } from 'i18next';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { DEFAULT_THEME } from '@/common/consts';
import NavBar from '@/components/NavBar/NavBar';
import Auth from '@/features/auth/Auth';
import { NAMESPACE } from '@/i18n/consts';
import initTranslations from '@/i18n/i18n';
import i18nConfig from '@/i18n/i18nConfig';
import { AppProvider } from '@/providers/AppProvider';
import TranslationsProvider from '@/providers/TranslationsProvider';
import { UserProvider } from '@/providers/UserProvider';
import { ParamsType } from '@/types/common';
import { theme } from '../../styles/theme';

type LayoutProps = {
  children: React.ReactNode;
} & ParamsType;

export const metadata = {
  title: 'Riderz',
  description: 'Riderz',
};

// statically generates pages for each of our languages
export function generateStaticParams() {
  return i18nConfig.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const { t, resources } = await initTranslations(locale, [
    NAMESPACE.CLIENT_SIDE_COMPONENTS,
    NAMESPACE.LAYOUT,
  ]);

  return (
    <html lang={locale} {...mantineHtmlProps} dir={dir(locale)}>
      <head data-mantine-color-scheme={DEFAULT_THEME}>
        <ColorSchemeScript defaultColorScheme={DEFAULT_THEME} />
        <link rel="logo icon" href="/favicon.png" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        {/* prefetch icons */}
        <link rel="preload" href="/logo.png" as="image" />
      </head>

      <body>
        <MantineProvider theme={theme} defaultColorScheme={DEFAULT_THEME}>
          <AppProvider>
            <UserProvider>
              <TranslationsProvider
                locale={locale}
                namespaces={NAMESPACE.CLIENT_SIDE_COMPONENTS}
                resources={resources}
              >
                <NavBar t={t} locale={locale} />

                {children}

                <Auth />
              </TranslationsProvider>
            </UserProvider>
          </AppProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
