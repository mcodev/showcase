'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useAppContext } from '@/providers/AppProvider';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignUp = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { closeAuthModal } = useAppContext();

  const { t } = useTranslation();

  return (
    <Flex direction="column" mt="xl">
      <TextInput label={t('name')} placeholder={t('name')} mb="lg" labelProps={{ mb: '4px' }} />

      <TextInput label="Email" placeholder="email" mb="xl" labelProps={{ mb: '4px' }} />

      <PasswordInput
        label={t('password')}
        placeholder={t('password')}
        labelProps={{ mb: '4px' }}
        mb="xs"
      />

      <PasswordInput
        label={t('repeat_password')}
        placeholder={t('password')}
        labelProps={{ mb: '4px' }}
        mb="lg"
      />

      <Flex mt="lg" className=" keep_text_straight wrap">
        <Checkbox />

        <Text c="dimmed" fw={400} mr={4} ml="xs" size="sm">
          {t('i_agree_with_the')}
        </Text>

        <Link href="/terms" className="cursor_pointer hover_color" onClick={closeAuthModal}>
          <Text fw={400} size="sm">
            {t('terms_and_conditions')}
          </Text>
        </Link>
      </Flex>

      <Button w="100%" mt="xl">
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
  );
};
export default SignUp;
