import '@mantine/core/styles.css';
import '../styles/global.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
import { DEFAULT_THEME } from '@/common/consts';
import NavBar from '@/components/NavBar/NavBar';
import UserProvider from '@/Providers/UserProvider';
import { theme } from '../styles/theme';

export const metadata = {
  title: 'Riderz',
  description: 'Riderz',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
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
            <NavBar />
            {children}
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
