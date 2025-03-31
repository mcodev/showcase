'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isValidValue } from '@/common/helpers';
import { EmailSchema, PasswordSchema, UsernameSchema } from '@/common/zodValidators';
import showNotification from '@/components/ShowNotification/ShowNotification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { useModulesContext } from '@/providers/ModulesProvider';
import { SERVICE } from '@/services';
import { RegisterFormType } from '@/types/payloadTypes';
import { AUTH_COMPONENTS } from '../consts';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignUp = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { closeAuthModal } = useModulesContext();
  const { request } = useApiConnection();

  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: '',
      termsOfService: false,
    },

    validate: {
      username: (value) => isValidValue(UsernameSchema, value),
      email: (value) => isValidValue(EmailSchema, value),
      password: (value) => isValidValue(PasswordSchema, value),
      repeatPassword: (value, values) =>
        value === values.password ? null : 'passwords_do_not_match',
      termsOfService: (value) => (value ? null : 'must_accept_terms'),
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (values: RegisterFormType) =>
      request({
        service: SERVICE.SIGN_UP_SERVICE,
        payload: {
          username: values.username.trim(),
          email: values.email,
          password: values.password,
        },
      }),

    onSuccess: () => {
      closeAuthModal();
    },
    onError: (error) => {
      showNotification({
        title: t('error'),
        message: t(error.message),
      });

      if (error.message === 'USERNAME_IN_NOT_UNIQUE') {
        form.setFieldError('username', t('username_not_unique'));
      }
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => signUpMutation.mutate(values))}>
      <Flex direction="column" mt="xl">
        <TextInput
          label={t('username')}
          placeholder={t('username')}
          mb="lg"
          labelProps={{ mb: '4px' }}
          value={form.values.username}
          onChange={(event) => form.setFieldValue('username', event.target.value)}
          key={form.key('username')}
          error={t(form.errors.username as string)}
        />

        <TextInput
          label="Email"
          placeholder="email"
          mb="xl"
          labelProps={{ mb: '4px' }}
          key={form.key('email')}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.target.value.trim())}
          error={t(form.errors.email as string)}
        />

        <PasswordInput
          label={t('password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="xs"
          key={form.key('password')}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.target.value.trim())}
          error={t(form.errors.password as string)}
        />

        <PasswordInput
          label={t('repeat_password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="lg"
          key={form.key('repeatPassword')}
          value={form.values.repeatPassword}
          onChange={(event) => form.setFieldValue('repeatPassword', event.target.value.trim())}
          error={t(form.errors.repeatPassword as string)}
        />

        <Flex mt="lg">
          <Checkbox
            key={form.key('termsOfService')}
            checked={form.values.termsOfService}
            onChange={(event) => form.setFieldValue('termsOfService', event.currentTarget.checked)}
            error={t(form.errors.termsOfService as string)}
            label={
              <Flex className="keep_text_straight wrap">
                <Text c="dimmed" fw={400} mr={4} size="sm">
                  {t('i_agree_with_the')}
                </Text>

                <Link href="/terms" className="cursor_pointer hover_color" onClick={closeAuthModal}>
                  <Text fw={400} size="sm">
                    {t('terms_and_conditions')}
                  </Text>
                </Link>
              </Flex>
            }
          />
        </Flex>

        <Button w="100%" mt="xl" type="submit" loading={signUpMutation.isPending}>
          {t('sign_up')}
        </Button>

        <Flex mt="lg" justify="center">
          <Text c="dimmed" fw={400} mr="xs" size="sm">
            {t('already_have_an_account')}
          </Text>

          <Text
            onClick={() => changeSelectedComponent(AUTH_COMPONENTS.SIGN_IN)}
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
export default SignUp;
