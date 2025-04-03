import { useTranslation } from 'react-i18next';
import { Flex } from '@mantine/core';
import CustomModal from '@/components/CustomModal/CustomModal';

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
      <Flex direction="column" gap={32} pt="sm" mt="xl">
        {/* <ColorSchemeToggle />
    <Divider mt="sm" mb="sm" />
    <LanguageSelector /> */}
      </Flex>
    </CustomModal>
  );
};

export default SettingsModal;
