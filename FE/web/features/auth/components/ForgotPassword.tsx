import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isValidEmail } from '@/common/validators';
import notification from '@/components/Notifications/notification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';
import { ForgotPasswordFormType } from '@/types/payloadTypes';
import { useAuthContext } from '../context/AuthSelectionProvider';

const ForgotPassword = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();
  const { request } = useApiConnection();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
    },

    validate: {
      email: (value) => isValidEmail(value),
    },
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (values: ForgotPasswordFormType) =>
      request({ service: SERVICE.FORGOT_PASSWORD_SERVICE, payload: values }),

    onSuccess: () => {},
    onError: (error) => {
      notification({
        title: t('error'),
        message: t(error.message),
      });
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => forgotPasswordMutation.mutate(values))}>
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

        <Button w="100%" mt="xl" type="submit" loading={forgotPasswordMutation.isPending}>
          {t('send_reset_code')}
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
