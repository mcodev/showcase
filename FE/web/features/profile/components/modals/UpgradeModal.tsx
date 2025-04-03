import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';

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
      <div>Upgrade</div>
    </CustomModal>
  );
};

export default UpgradeModal;
