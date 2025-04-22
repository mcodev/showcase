import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, Textarea } from '@mantine/core';
import CustomModal from '@/components/CustomModal/CustomModal';

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
      withTopCloseButton={false}
    >
      <Flex w="100%" direction="column">
        <Flex direction="column" w="100%" mb="sm">
          <Text c="dimmed" mb="sm">
            {t('how_can_we_help_you')}
          </Text>

          <Textarea placeholder={t('your_message')} autosize minRows={2} maxRows={6} />
        </Flex>

        <Flex mt="xl" justify="flex-end" gap={16} w="100%">
          <Button variant="primaryOutlined" onClick={handleCloseModal}>
            {t('cancel')}
          </Button>

          <Button onClick={handleCloseModal}>{t('send')}</Button>
        </Flex>
      </Flex>
    </CustomModal>
  );
};

export default SupportModal;
