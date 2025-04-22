'use client';

import React from 'react';
import { IconMoon, IconSun } from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Flex, Text, useMantineColorScheme } from '@mantine/core';
import styles from './ColorSchemeToggle.module.css';

const ColorSchemeToggle = () => {
  const { t } = useTranslation();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <Flex gap="xl" align="center" justify="center">
      <button
        type="button"
        className={`${styles.button} ${colorScheme === 'dark' && styles.buttonSelected}`}
        onClick={() => setColorScheme('dark')}
      >
        <IconMoon />

        <Text>{t('dark')}</Text>
      </button>

      <button
        type="button"
        className={`${styles.button} ${colorScheme === 'light' && styles.buttonSelected}`}
        onClick={() => setColorScheme('light')}
      >
        <IconSun />

        <Text>{t('light')}</Text>
      </button>
    </Flex>
  );
};

export default ColorSchemeToggle;
