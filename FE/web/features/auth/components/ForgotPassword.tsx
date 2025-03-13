import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useAuthContext } from '../context/AuthSelectionProvider';

const ForgotPassword = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  return (
    <Flex direction="column" mt="xl">
      <TextInput label="Email" placeholder="email" labelProps={{ mb: '4px' }} />

      <Button w="100%" mt="xl">
        {t('send_reset_link')}
      </Button>

      <Flex mt="xl" justify="center">
        <Text c="dimmed" fw={400} mr="xs" size="sm">
          {t('already_have_an_account')}
        </Text>

        <Text
          onClick={() => changeSelectedComponent('signIn')}
          className="cursor_pointer hover_color"
          fw={400}
          size="sm"
        >
          {t('sign_in')}
        </Text>
      </Flex>
    </Flex>
  );
};

export default ForgotPassword;
