'use client';

import { Button, createTheme, Input } from '@mantine/core';
import buttonStyles from './components/Button.module.css';
import inputStyles from './components/Input.module.css';

export const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: inputStyles,
      defaultProps: {
        variant: 'primary',
      },
    }),
    Button: Button.extend({
      classNames: buttonStyles,
      defaultProps: {
        variant: 'primary',
      },
    }),
  },
  // other: {
  // ...baseTheme,
  // },
});
