import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignIn = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Flex mt="xl" direction="column">
      <TextInput label="Email" placeholder="email" mb="lg" mt="lg" labelProps={{ mb: '4px' }} />

      <PasswordInput
        label={t('password')}
        placeholder={t('password')}
        labelProps={{ mb: '4px' }}
        mb="lg"
      />

      <Text
        onClick={() => changeSelectedComponent('forgotPassword')}
        className="cursor_pointer cursor_hover"
        c="blue"
        fw={400}
        ta="right"
      >
        {t('forgot_password')}
      </Text>

      <Button w="100%" mt="xl">
        {t('sign_in')}
      </Button>

      <Flex mt="lg" justify="center">
        <Text c="dimmed" fw={400} mr="xs" size="sm">
          {t('dont_have_an_account')}
        </Text>
        <Text
          onClick={() => changeSelectedComponent('signUp')}
          className="cursor_pointer cursor_hover"
          c="blue"
          fw={400}
          size="sm"
        >
          {t('sign_up')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default SignIn;
