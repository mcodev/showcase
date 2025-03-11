'use client';

import { createTheme, Input } from '@mantine/core';
import inputStyles from './components/Input.module.css';

export const theme = createTheme({
  components: {
    Input: Input.extend({
      classNames: inputStyles,
      defaultProps: {
        variant: 'primary',
      },
    }),
  },
  other: {
    // ...baseTheme,
  },
});
