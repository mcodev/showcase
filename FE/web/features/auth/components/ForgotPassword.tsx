import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isEmail } from '@/common/validators';
import { useAuthContext } from '../context/AuthSelectionProvider';

const ForgotPassword = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => isEmail(value),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log('values', values))}>
      <Flex direction="column" mt="xl">
        <TextInput
          label="Email"
          placeholder="email"
          labelProps={{ mb: '4px' }}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          error={t(form.errors.email as string)}
          required
        />

        <Button w="100%" mt="xl" type="submit">
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
    </form>
  );
};

export default ForgotPassword;
