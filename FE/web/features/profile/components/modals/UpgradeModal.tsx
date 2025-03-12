import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';
import Upgrade from './components/Upgrade';

type ProfileEventsModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const UpgradeModal = ({ isVisible, handleCloseModal }: ProfileEventsModalProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('upgrade')}
      size="xl"
      withTopCloseButton
    >
      <Upgrade />
    </CustomModal>
  );
};

export default UpgradeModal;
