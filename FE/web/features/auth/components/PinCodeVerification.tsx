'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import secureLocalStorage from 'react-secure-storage';
import { Button, Flex, PinInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { TEMPORARY_TOKEN_KEY, USER_EMAIL_KEY } from '@/common/consts';
import showNotification from '@/components/ShowNotification/ShowNotification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';
import { ResetCodeVerificationFormType } from '@/types/payloadTypes';
import { ResetCodeVerificationDataType } from '@/types/responseTypes';
import { AUTH_COMPONENTS } from '../consts';
import { useAuthContext } from '../context/AuthSelectionProvider';

const PinCodeVerification = () => {
  const { changeSelectedComponent, handleAuthModalParam } = useAuthContext();
  const { t } = useTranslation();
  const { request } = useApiConnection();

  const userEmail = secureLocalStorage.getItem(USER_EMAIL_KEY) as string;

  const form = useForm({
    mode: 'controlled',
    initialValues: {
      resetCode: '',
    },
  });

  const resetCodeVerificationMutation = useMutation({
    mutationFn: (values: ResetCodeVerificationFormType) =>
      request({
        service: SERVICE.RESET_CODE_VERIFICATION_SERVICE,
        payload: values,
      }) as unknown as Promise<ResetCodeVerificationDataType | null>,

    onSuccess: (res) => {
      if (res?.data.temporaryResetToken) {
        secureLocalStorage.setItem(TEMPORARY_TOKEN_KEY, res.data.temporaryResetToken);
        handleAuthModalParam({ type: 'set', param: AUTH_COMPONENTS.CHANGE_PASSWORD });
        changeSelectedComponent(AUTH_COMPONENTS.CHANGE_PASSWORD);
      }
    },
    onError: (error) => {
      showNotification({
        title: t('error'),
        message: t(error.message),
      });

      if (error.message !== 'INVALID_RESET_CODE') {
        changeSelectedComponent(AUTH_COMPONENTS.FORGOT_PASSWORD);
        handleAuthModalParam({ type: 'delete' });
      }
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        resetCodeVerificationMutation.mutate({ ...values, email: userEmail || '' });
      })}
    >
      <Flex direction="column">
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

        <Button
          w="100%"
          mt="xl"
          type="submit"
          disabled={form.values.resetCode.length !== 5}
          loading={resetCodeVerificationMutation.isPending}
        >
          {t('send')}
        </Button>
      </Flex>
    </form>
  );
};

export default PinCodeVerification;
