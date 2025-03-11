import '@mantine/core/styles.css';
import '../styles/global.css';

import React from 'react';
import { ColorSchemeScript, mantineHtmlProps, MantineProvider } from '@mantine/core';
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
      <head data-mantine-color-scheme="dark">
        <ColorSchemeScript defaultColorScheme="dark" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <UserProvider>
            <NavBar />
            {children}
          </UserProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
