'use client';

import { Button, createTheme, Input, PinInput } from '@mantine/core';
import buttonStyles from './components/Button.module.css';
import checkboxStyles from './components/Checkbox.module.css';
import inputStyles from './components/Input.module.css';
import pinInputStyles from './components/PinInput.module.css';

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
    Checkbox: Input.extend({
      classNames: checkboxStyles,
    }),
    PinInput: PinInput.extend({
      classNames: pinInputStyles,
    }),
  },
  // other: {
  // ...baseTheme,
  // },
});
