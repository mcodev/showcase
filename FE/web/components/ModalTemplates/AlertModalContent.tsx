import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, Text } from '@mantine/core';

type AlertModalContentProps = {
  descriptionKey: string;
  onCloseModal: () => void;
  onActionClick: () => void;
  closeButtonKey?: string;
  actionButtonKey?: string;
  alertType?: 'warn' | 'danger';
};

const AlertModalContent = ({
  descriptionKey,
  onCloseModal,
  onActionClick,
  closeButtonKey,
  actionButtonKey,
  alertType = 'danger',
}: AlertModalContentProps) => {
  const { t } = useTranslation();
  return (
    <Flex display="flex" direction="column" w="100%" justify="center">
      <Text c="dimmed">{t(descriptionKey)}</Text>

      <Flex mt="xl" justify="flex-end" gap={16}>
        <Button variant="primaryOutlined" onClick={onCloseModal}>
          {t(closeButtonKey || 'cancel')}
        </Button>

        <Button variant={alertType === 'warn' ? 'default' : 'danger'} onClick={onActionClick}>
          {t(actionButtonKey || 'ok')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default AlertModalContent;
