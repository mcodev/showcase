import { useMutation } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import secureLocalStorage from 'react-secure-storage';
import { REFRESH_TOKEN_KEY } from '@/common/consts';
import CustomModal from '@/components/CustomModal/CustomModal';
import AlertModalContent from '@/components/ModalTemplates/AlertModalContent';
import showNotification from '@/components/ShowNotification/ShowNotification';
import { useApiConnection } from '@/providers/ApiConnectionProvider';
import { SERVICE } from '@/services';

type SignOutModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const SignOutModal = ({ isVisible, handleCloseModal }: SignOutModalProps) => {
  const { request, clearTokens } = useApiConnection();
  const { t } = useTranslation();

  const SignOutMutation = useMutation({
    mutationFn: () =>
      request({
        service: SERVICE.LOGOUT_SERVICE,
        payload: { refreshToken: secureLocalStorage.getItem(REFRESH_TOKEN_KEY) },
      }),

    onSuccess: () => {
      clearTokens();
      handleCloseModal();
    },
    onError: (error) => {
      showNotification({
        title: t('error'),
        message: t(error.message),
      });
    },
  });

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('sign_out')}
      size="lg"
      withTopCloseButton={false}
    >
      <AlertModalContent
        descriptionKey="sign_out_confirmation"
        onCloseModal={handleCloseModal}
        onActionClick={SignOutMutation.mutate}
        closeButtonKey="cancel"
        actionButtonKey="sign_out"
        alertType="danger"
      />
    </CustomModal>
  );
};

export default SignOutModal;
