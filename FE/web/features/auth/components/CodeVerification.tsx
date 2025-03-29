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
import { useAuthContext } from '../context/AuthSelectionProvider';

const userEmail = secureLocalStorage.getItem(USER_EMAIL_KEY) as string;

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

  const resetCodeVerificationMutation = useMutation({
    mutationFn: (values: ResetCodeVerificationFormType) =>
      request({
        service: SERVICE.RESET_CODE_VERIFICATION_SERVICE,
        payload: values,
      }) as Promise<ResetCodeVerificationDataType | null>,

    onSuccess: (res) => {
      if (res?.data.refreshToken) {
        secureLocalStorage.setItem(TEMPORARY_TOKEN_KEY, res.data.refreshToken);
        handleAuthModalParam({ type: 'set', param: 'changePassword' });
        changeSelectedComponent('changePassword');
      }
    },
    onError: (error) => {
      showNotification({
        title: t('error'),
        message: t(error.message),
      });
      changeSelectedComponent('forgotPassword');
      handleAuthModalParam({ type: 'delete' });
    },
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        resetCodeVerificationMutation.mutate({ ...values, email: userEmail || '' });
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
