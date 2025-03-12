import { useTranslation } from 'react-i18next';
import CustomModal from '@/components/CustomModal/CustomModal';
import Support from './components/Support';

type SupportModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const SupportModal = ({ isVisible, handleCloseModal }: SupportModalProps) => {
  const { t } = useTranslation();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('support')}
      size="lg"
      withTopCloseButton
    >
      <Support handleCloseModal={handleCloseModal} />
    </CustomModal>
  );
};

export default SupportModal;
