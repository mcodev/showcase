import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Button, Flex, PinInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import notification from '@/components/Notifications/notification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';
import { ResetCodeVerificationFormType } from '@/types/payloadTypes';
import { useAuthContext } from '../context/AuthSelectionProvider';

const CodeVerification = () => {
  const { changeSelectedComponent, handleAuthModalParam } = useAuthContext();
  const { t } = useTranslation();
  const { request } = useApiConnection();

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      resetCode: '',
    },
  });

  const forgotPasswordMutation = useMutation({
    // TODO add response types in all mutations
    mutationFn: (values: ResetCodeVerificationFormType) =>
      request({ service: SERVICE.RESET_CODE_VERIFICATION_SERVICE, payload: values }),

    onSuccess: () => {
      // handleAuthModalParam({ type: 'set', param: 'verifyResetCode' });
      // changeSelectedComponent('verifyResetCode');
    },
    onError: (error) => {
      notification({
        title: t('error'),
        message: t(error.message),
      });
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        forgotPasswordMutation.mutate(values);
      })}
    >
      <Flex direction="column" mt="xl">
        <Flex w="100%" justify="center" mt="lg" mb="lg">
          <PinInput
            length={5}
            size="xl"
            value={form.values.resetCode}
            inputMode="numeric"
            oneTimeCode
            onChange={(value) => form.setFieldValue('resetCode', value)}
          />
        </Flex>

        <Button w="100%" mt="xl" type="submit" disabled={form.values.resetCode.length !== 5}>
          {t('send')}
        </Button>
      </Flex>
    </form>
  );
};

export default CodeVerification;
