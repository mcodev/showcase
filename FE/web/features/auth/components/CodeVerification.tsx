import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PinInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuthContext } from '../context/AuthSelectionProvider';

const CodeVerification = () => {
  const { changeSelectedComponent } = useAuthContext();
  const { t } = useTranslation();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      code: '',
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => {})}>
      <Flex direction="column" mt="xl">
        <Flex w="100%" justify="center" mt="lg" mb="lg">
          <PinInput
            length={5}
            size="xl"
            value={form.values.code}
            inputMode="numeric"
            oneTimeCode
            onChange={(value) => form.setFieldValue('code', value)}
          />
        </Flex>

        <Button w="100%" mt="xl" type="submit" disabled={form.values.code.length !== 5}>
          {t('send')}
        </Button>
      </Flex>
    </form>
  );
};

export default CodeVerification;
