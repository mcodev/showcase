'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { Flex, MantineSize, Modal, Text } from '@mantine/core';

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  titleColor?: string;
  size?: number | MantineSize | (string & {}) | undefined;
  children: React.ReactNode;
  withTopCloseButton?: boolean;
};

const CustomModal = ({
  isVisible,
  onClose,
  title,
  size = 'lg',
  children,
  titleColor = 'text',
  withTopCloseButton = true,
}: CustomModalProps) => {
  const { t } = useTranslation();

  return (
    <Modal
      opened={isVisible}
      onClose={onClose}
      autoFocus={false}
      withCloseButton={withTopCloseButton}
      trapFocus={false}
      size={size}
      transitionProps={{ transition: 'fade', duration: 200 }}
      closeOnClickOutside={false}
      radius="md"
      shadow="xs"
      padding="xl"
      centered
      title={
        <Text fw={600} size="xl" c={`var(--color-${titleColor})`}>
          {t(title || '')}
        </Text>
      }
    >
      <Flex direction="column" m={0}>
        {children}
      </Flex>
    </Modal>
  );
};

export default CustomModal;
