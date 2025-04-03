import { useTranslation } from 'react-i18next';
import { Button, Flex, TextInput } from '@mantine/core';
import CustomModal from '@/components/CustomModal/CustomModal';
import { useUserContext } from '@/providers/UserProvider';
import MembershipBadge from '../MembershipBadge/MembershipBadge';

type AccountModalProps = {
  isVisible: boolean;
  handleCloseModal: () => void;
};

const AccountModal = ({ isVisible, handleCloseModal }: AccountModalProps) => {
  const { t } = useTranslation();
  const { userDetails } = useUserContext();

  return (
    <CustomModal
      isVisible={isVisible}
      onClose={handleCloseModal}
      title={t('account')}
      size="md"
      withTopCloseButton={false}
    >
      <Flex w="100%" mt="xl" direction="column" pos="relative">
        <Flex direction="column" w="100%">
          <Flex gap={16} w="100%" />

          <Flex pos="absolute" top={-58} right={0}>
            <MembershipBadge />
          </Flex>

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
    </CustomModal>
  );
};

export default AccountModal;
