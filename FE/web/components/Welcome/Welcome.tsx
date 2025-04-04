import { Text, Title } from '@mantine/core';
import { TranslationFunctionType } from '@/types/common';
import classes from './Welcome.module.css';

type WelcomeProps = {
  t?: TranslationFunctionType;
};

export function Welcome({ t }: WelcomeProps) {
  return (
    <>
      <Title className={classes.title} ta="center" mt={100}>
        {/* Welcome to {t?.('home')} */}
        <Text inherit variant="gradient" component="span" gradient={{ from: 'pink', to: 'yellow' }}>
          Work in progress
        </Text>
      </Title>
    </>
  );
}
