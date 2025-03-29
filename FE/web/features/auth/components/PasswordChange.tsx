import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import secureLocalStorage from 'react-secure-storage';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TEMPORARY_TOKEN_KEY, USER_EMAIL_KEY } from '@/common/consts';
import { isPasswordMatch, isValidPassword } from '@/common/validators';
import showNotification from '@/components/ShowNotification/ShowNotification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';
import { ChangePasswordFormType } from '@/types/payloadTypes';
import { useAuthContext } from '../context/AuthSelectionProvider';

const PasswordChange = () => {
  const { t } = useTranslation();
  const { request } = useApiConnection();
  const { changeSelectedComponent, handleAuthModalParam } = useAuthContext();

  const userEmail = secureLocalStorage.getItem(USER_EMAIL_KEY) as string;
  const tempResetToken = secureLocalStorage.getItem(TEMPORARY_TOKEN_KEY) as string;

  const clearStoredHelperVars = () => {
    secureLocalStorage.removeItem(USER_EMAIL_KEY);
    secureLocalStorage.removeItem(TEMPORARY_TOKEN_KEY);
    handleAuthModalParam({ type: 'delete' });
  };

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      password: '',
      repeatPassword: '',
    },

    validate: {
      password: (value) => isValidPassword(value),
      repeatPassword: (value, values) =>
        isPasswordMatch(value, values.password ? values.password : ''),
    },
  });

  const changePasswordMutation = useMutation({
    mutationFn: (values: ChangePasswordFormType) =>
      request({
        service: SERVICE.RESET_PASSWORD_SERVICE,
        payload: values,
      }),

    onSuccess: () => {
      showNotification({
        title: t('success'),
        message: t('password_changed'),
      });
      clearStoredHelperVars();
      changeSelectedComponent('signIn');
    },
    onError: (error) => {
      showNotification({
        title: t('error'),
        message: t(error.message),
      });
      clearStoredHelperVars();
      changeSelectedComponent('forgotPassword');
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) =>
        changePasswordMutation.mutate({
          password: values.password.trim(),
          email: userEmail,
          temporaryResetToken: tempResetToken,
        })
      )}
    >
      <Flex direction="column" mt="xl">
        <PasswordInput
          label={t('new_password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="xs"
          key={form.key('password')}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.target.value.trim())}
          error={t(form.errors.password as string)}
          required
        />

        <PasswordInput
          label={t('confirm_password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="lg"
          key={form.key('repeatPassword')}
          value={form.values.repeatPassword}
          onChange={(event) => form.setFieldValue('repeatPassword', event.target.value.trim())}
          error={t(form.errors.repeatPassword as string)}
          required
        />
      </Flex>

      <Button w="100%" mt="xl" type="submit" loading={changePasswordMutation.isPending}>
        {t('change')}
      </Button>
    </form>
  );
};

export default PasswordChange;
