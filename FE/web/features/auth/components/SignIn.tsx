import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isEmail } from '@/common/validators';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignIn = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => isEmail(value),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log('values', values))}>
      <Flex mt="xl" direction="column">
        <TextInput
          label="Email"
          placeholder="email"
          mb="lg"
          mt="lg"
          labelProps={{ mb: '4px' }}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          error={t(form.errors.email as string)}
          required
        />

        <PasswordInput
          label={t('password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="lg"
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.target.value)}
          required
        />

        <Text
          onClick={() => changeSelectedComponent('forgotPassword')}
          className="cursor_pointer hover_color"
          fw={400}
          ta="right"
        >
          {t('forgot_password')}
        </Text>

        <Button w="100%" mt="xl" type="submit">
          {t('sign_in')}
        </Button>

        <Flex mt="lg" justify="center">
          <Text c="dimmed" fw={400} mr="xs" size="sm">
            {t('dont_have_an_account')}
          </Text>
          <Text
            onClick={() => changeSelectedComponent('signUp')}
            className="cursor_pointer hover_color"
            fw={400}
            size="sm"
          >
            {t('sign_up')}
          </Text>
        </Flex>
      </Flex>
    </form>
  );
};

export default SignIn;
