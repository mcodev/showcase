import { useTranslation } from 'react-i18next';
import { Divider, Flex } from '@mantine/core';
import ColorSchemeToggle from '@/components/ColorSchemeToggle/ColorSchemeToggle';
import CustomModal from '@/components/CustomModal/CustomModal';
import LanguageSelector from '@/components/LanguageSelector/LanguageSelector';

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
      <Flex direction="column" gap={24}>
        <ColorSchemeToggle />

        <Divider mt="sm" mb="sm" />

        <LanguageSelector />
      </Flex>
    </CustomModal>
  );
};

export default SettingsModal;
