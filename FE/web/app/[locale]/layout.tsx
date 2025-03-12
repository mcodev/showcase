import '@mantine/core/styles.css';
import '@/styles/global.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { DEFAULT_THEME } from '@/common/consts';
import NavBar from '@/components/NavBar/NavBar';
import { NAMESPACES_LIST } from '@/i18n/consts';
import initTranslations from '@/i18n/i18n';
import TranslationsProvider from '@/Providers/TranslationsProvider';
import UserProvider from '@/Providers/UserProvider';
import { ParamsType } from '@/types/common';
import { theme } from '../../styles/theme';

type LayoutProps = {
  children: React.ReactNode;
} & ParamsType;

export const metadata = {
  title: 'Riderz',
  description: 'Riderz',
};

export default async function RootLayout({ children, params }: LayoutProps) {
  const { locale } = await params;

  const { resources } = await initTranslations(locale, NAMESPACES_LIST);

  return (
    <html lang={locale} {...mantineHtmlProps}>
      <head data-mantine-color-scheme={DEFAULT_THEME}>
        <ColorSchemeScript defaultColorScheme={DEFAULT_THEME} />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>

      <body>
        <MantineProvider theme={theme} defaultColorScheme={DEFAULT_THEME}>
          <UserProvider>
            <TranslationsProvider
              locale={locale}
              namespaces={NAMESPACES_LIST}
              resources={resources}
            >
              <NavBar />
              {children}
            </TranslationsProvider>
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
