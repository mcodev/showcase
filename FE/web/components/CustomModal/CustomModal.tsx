'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { CloseButton, Flex, Modal, Title } from '@mantine/core';

type CustomModalProps = {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  titleColor?: string;
  // TODO fix this
  size?: any;
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
      withCloseButton={false}
      centered
      size={size}
      transitionProps={{ transition: 'fade', duration: 200 }}
      closeOnClickOutside={false}
      radius="lg"
      shadow="xs"
      padding="xl"
      overlayProps={{
        style: {
          background: 'rgba(150, 150, 150, 0.2)',
          backdropFilter: 'blur(4px)',
        },
      }}
    >
      {(title || withTopCloseButton) && (
        <Flex justify="space-between" align="center">
          <Title order={2} lineClamp={1} c={titleColor}>
            {title && t(title || '')}
          </Title>

          {withTopCloseButton && <CloseButton onClick={onClose} />}
        </Flex>
      )}

      <Flex direction="column">{children}</Flex>
    </Modal>
  );
};

export default CustomModal;
