import React from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Flex, PasswordInput, Text, TextInput } from '@mantine/core';
import { useAuthContext } from '../context/AuthSelectionProvider';

const SignUp = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  const router = useRouter();

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

        <Text c="dimmed" fw={400} mr="xs" ml="xs" size="sm">
          {t('i_agree_with_the')}
        </Text>

        <Text
          onClick={() => router.push('/terms')}
          className="cursor_pointer cursor_hover"
          c="blue"
          fw={400}
          size="sm"
        >
          {t('terms_and_conditions')}
        </Text>
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
          className="cursor_pointer cursor_hover"
          c="blue"
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
