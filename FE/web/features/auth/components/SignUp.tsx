'use client';

import React from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  isPasswordMatch,
  isTermsOfServiceAccepted,
  isValidEmail,
  isValidName,
  isValidPassword,
} from '@/common/validators';
import showNotification from '@/components/ShowNotification/ShowNotification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { useModulesContext } from '@/providers/ModulesProvider';
import { SERVICE } from '@/services';
import { RegisterFormType } from '@/types/payloadTypes';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignUp = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { closeAuthModal } = useModulesContext();
  const { request } = useApiConnection();

  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      termsOfService: false,
    },

    validate: {
      name: (value) => isValidName(value),
      email: (value) => isValidEmail(value),
      password: (value) => isValidPassword(value),
      repeatPassword: (value, values) =>
        isPasswordMatch(value, values.password ? values.password : ''),
      termsOfService: (value) => isTermsOfServiceAccepted(value),
    },
  });

  const signUpMutation = useMutation({
    mutationFn: (values: RegisterFormType) =>
      request({
        service: SERVICE.SIGN_UP_SERVICE,
        payload: {
          name: values.name.trim(),
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
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => signUpMutation.mutate(values))}>
      <Flex direction="column" mt="xl">
        <TextInput
          label={t('name')}
          placeholder={t('name')}
          mb="lg"
          labelProps={{ mb: '4px' }}
          value={form.values.name}
          onChange={(event) => form.setFieldValue('name', event.target.value)}
          key={form.key('name')}
          error={t(form.errors.name as string)}
          required
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
          required
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
          required
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
          required
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
export default SignUp;
