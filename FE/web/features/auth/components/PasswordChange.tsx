import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { isPasswordMatch, isValidPassword } from '@/common/validators';

const PasswordChange = () => {
  const { t } = useTranslation();

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
  return (
    <form onSubmit={form.onSubmit((values) => {})}>
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

      <Button w="100%" mt="xl" type="submit">
        {t('sign_up')}
      </Button>
    </form>
  );
};

export default PasswordChange;
