import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';
import Settings from './components/Settings';

type SettingsModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const SettingsModal = ({ isVisible, handleCloseModal }: SettingsModalProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('settings')}
      size="sm"
      withTopCloseButton
    >
      <Settings />
    </CustomModal>
  );
};

export default SettingsModal;
