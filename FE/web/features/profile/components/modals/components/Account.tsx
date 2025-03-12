import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Flex, TextInput } from '@mantine/core';
import { useUserContext } from '@/providers/UserProvider';
import MembershipBadge from '../../MembershipBadge/MembershipBadge';

type AccountProps = {
  handleCloseModal: () => void;
};

const Account = ({ handleCloseModal }: AccountProps) => {
  const { t } = useTranslation();
  const { userDetails, isUserClient } = useUserContext();

  return (
    <Flex w="100%" mt="xl" direction="column" pos="relative">
      <Flex direction="column" w="100%">
        <Flex gap={16} w="100%" />

        <Flex pos="absolute" top={-58} right={0}>
          <MembershipBadge />
        </Flex>

        {isUserClient && (
          <TextInput
            defaultValue={userDetails?.name || ''}
            label={t('name')}
            placeholder={t('name')}
            mb="lg"
            labelProps={{ mb: '4px' }}
          />
        )}

        <TextInput
          defaultValue={userDetails?.email || ''}
          label="Email"
          placeholder="email"
          mb="xl"
          labelProps={{ mb: '4px' }}
        />
      </Flex>

      <Flex mt="xl" justify="flex-end" gap={16} w="100%">
        <Button variant="subtle" onClick={handleCloseModal}>
          {t('cancel')}
        </Button>

        <Button color="blue" onClick={handleCloseModal}>
          {t('save')}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Account;
