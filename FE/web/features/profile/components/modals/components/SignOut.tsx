import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import secureLocalStorage from 'react-secure-storage';
import AlertModalContent from '@/components/CustomModal/templates/AlertModalContent';
import Notification from '@/components/Notifications/Notification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';

type SignOutModalProps = {
  handleCloseModal: () => void;
};

const SignOut = ({ handleCloseModal }: SignOutModalProps) => {
  const { request, clearTokens } = useApiConnection();
  const { t } = useTranslation();

  const SignOutMutation = useMutation({
    mutationFn: () =>
      request({
        service: SERVICE.LOGOUT_SERVICE,
        payload: { refreshToken: secureLocalStorage.getItem('rt') },
      }),

    onSuccess: () => {
      clearTokens();
      handleCloseModal();
    },
    onError: (error) => {
      Notification({
        title: t('error'),
        message: t(error.message),
      });
    },
  });

  return (
    <AlertModalContent
      descriptionKey="sign_out_confirmation"
      onCloseModal={handleCloseModal}
      onActionClick={SignOutMutation.mutate}
      closeButtonKey="cancel"
      actionButtonKey="sign_out"
      alertType="danger"
    />
  );
};

export default SignOut;
