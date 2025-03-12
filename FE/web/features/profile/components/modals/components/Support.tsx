import { useTranslation } from 'react-i18next';
import { Button, Flex, Text, Textarea } from '@mantine/core';

type SupportProps = {
  handleCloseModal: () => void;
};

const Support = ({ handleCloseModal }: SupportProps) => {
  const { t } = useTranslation();

  return (
    <Flex w="100%" mt="xl" direction="column">
      <Flex direction="column" w="100%" mb="sm">
        <Text c="dimmed" mb="sm">
          {t('how_can_we_help_you')}
        </Text>

        <Textarea placeholder={t('your_message')} autosize minRows={2} maxRows={6} />
      </Flex>

      <Flex mt="xl" justify="flex-end" gap={16} w="100%">
        <Button variant="subtle" onClick={handleCloseModal}>
          {t('cancel')}
        </Button>

        <Button color="blue" onClick={handleCloseModal}>
          {t('send')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Support;
