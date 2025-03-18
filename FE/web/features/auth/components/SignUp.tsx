'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  isEmail,
  isName,
  isPassword,
  isPasswordMatch,
  isTermsOfServiceAccepted,
} from '@/common/validators';
import { useAppContext } from '@/providers/AppProvider';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignUp = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { closeAuthModal } = useAppContext();

  const { t } = useTranslation();

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      name: '',
      email: '',
      password: '',
      repeatPassword: '',
      termsOfService: false,
    },

    validate: {
      // name: (value) => (value ? null : 'Name is required'),
      name: (value) => isName(value),
      email: (value) => isEmail(value),
      password: (value) => isPassword(value),
      repeatPassword: (value, values) =>
        isPasswordMatch(value, values.password ? values.password : ''),
      termsOfService: (value) => isTermsOfServiceAccepted(value),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => console.log('values', values))}>
      <Flex direction="column" mt="xl">
        <TextInput
          label={t('name')}
          placeholder={t('name')}
          mb="lg"
          labelProps={{ mb: '4px' }}
          key={form.key('name')}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Email"
          placeholder="email"
          mb="xl"
          labelProps={{ mb: '4px' }}
          key={form.key('email')}
          {...form.getInputProps('email')}
        />

        <PasswordInput
          label={t('password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="xs"
          key={form.key('password')}
          {...form.getInputProps('password')}
        />

        <PasswordInput
          label={t('repeat_password')}
          placeholder={t('password')}
          labelProps={{ mb: '4px' }}
          mb="lg"
          key={form.key('repeatPassword')}
          {...form.getInputProps('repeatPassword')}
        />

        <Flex mt="lg" className=" keep_text_straight wrap">
          <Checkbox key={form.key('termsOfService')} {...form.getInputProps('termsOfService')} />

          <Text c="dimmed" fw={400} mr={4} ml="xs" size="sm">
            {t('i_agree_with_the')}
          </Text>

          <Link href="/terms" className="cursor_pointer hover_color" onClick={closeAuthModal}>
            <Text fw={400} size="sm">
              {t('terms_and_conditions')}
            </Text>
          </Link>
        </Flex>

        <Button w="100%" mt="xl" type="submit">
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
