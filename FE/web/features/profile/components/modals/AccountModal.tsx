import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';
import Account from './components/Account';

type AccountModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const AccountModal = ({ isVisible, handleCloseModal }: AccountModalProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('account')}
      size="md"
      withTopCloseButton={false}
    >
      <Account handleCloseModal={handleCloseModal} />
    </CustomModal>
  );
};

export default AccountModal;
