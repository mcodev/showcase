'use client';

import {
  Button,
  Checkbox,
  createTheme,
  Modal,
  PasswordInput,
  PinInput,
  TextInput,
} from '@mantine/core';
import buttonStyles from './components/Button.module.css';
import checkboxStyles from './components/Checkbox.module.css';
import modalStyles from './components/Modal.module.css';
import passwordInput from './components/PasswordInput.module.css';
import pinInputStyles from './components/PinInput.module.css';
import textInputStyles from './components/TextInput.module.css';

export const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: textInputStyles,
      defaultProps: {
        variant: 'primary',
      },
    }),
    PasswordInput: PasswordInput.extend({
      classNames: passwordInput,
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
    Checkbox: Checkbox.extend({
      classNames: checkboxStyles,
    }),
    PinInput: PinInput.extend({
      classNames: pinInputStyles,
    }),
    Modal: Modal.extend({
      classNames: modalStyles,
    }),
  },
});
