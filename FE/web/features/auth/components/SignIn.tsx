import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isValidEmail } from '@/common/validators';
import Notification from '@/components/Notifications/Notification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { useModulesContext } from '@/providers/ModulesProvider';
import { SERVICE } from '@/services';
import { LoginFormType } from '@/types/payloadTypes';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignIn = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { request } = useApiConnection();
  const { closeAuthModal } = useModulesContext();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (value) => isValidEmail(value),
    },
  });

  const signInMutation = useMutation({
    mutationFn: (values: LoginFormType) =>
      request({ service: SERVICE.LOGIN_SERVICE, payload: values }),

    onSuccess: () => {
      closeAuthModal();
    },
    onError: (error) => {
      Notification({
        title: t('error'),
        message: t(error.message),
      });
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => signInMutation.mutate(values))}>
      <Flex mt="xl" direction="column">
        <TextInput
          label="Email"
          placeholder="email"
          mb="lg"
          mt="lg"
          labelProps={{ mb: '4px' }}
          value={form.values.email.trim()}
          onChange={(event) => form.setFieldValue('email', event.target.value)}
          error={t(form.errors.email as string)}
          required
        />

        <PasswordInput
          label={t('password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="lg"
          value={form.values.password.trim()}
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

        <Button w="100%" mt="xl" type="submit" loading={signInMutation.isPending}>
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
