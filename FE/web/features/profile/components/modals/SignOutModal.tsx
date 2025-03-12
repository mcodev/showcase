import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';
import SignOut from './components/SignOut';

type SignOutModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const SignOutModal = ({ isVisible, handleCloseModal }: SignOutModalProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('sign_out')}
      size="lg"
      withTopCloseButton={false}
    >
      <SignOut handleCloseModal={handleCloseModal} />
    </CustomModal>
  );
};

export default SignOutModal;
