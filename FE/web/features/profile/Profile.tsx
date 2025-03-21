'use client';

import { useTranslation } from 'react-i18next';
import { Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useAppContext } from '@/providers/AppProvider';
import { useUserContext } from '@/providers/UserProvider';
import FavoritesDrawer from './components/Drawers/FavoritesDrawer';
import AccountModal from './components/modals/AccountModal';
import SettingsModal from './components/modals/SettingsModal';
import SignOutModal from './components/modals/SignOutModal';
import SupportModal from './components/modals/SupportModal';
import SignedInBar from './components/SignedInBar/SignedInBar';
import { ModalType, SelectedDrawerType } from './types';

const Profile = () => {
  const { openAuthModal } = useAppContext();
  const { isLoggedIn } = useUserContext();

  const { t } = useTranslation();

  const [isSettingsModalVisible, { open: openSettingsModal, close: closeSettingsModal }] =
    useDisclosure(false);

  const [isAccountModalVisible, { open: openAccountModal, close: closeAccountsModal }] =
    useDisclosure(false);

  const [isSupportModalVisible, { open: openSupportModal, close: closeSupportModal }] =
    useDisclosure(false);

  const [isSignOutModalVisible, { open: openSignOutModal, close: closeSignOutModal }] =
    useDisclosure(false);

  const [isFavoritesDrawerVisible, { open: openFavoritesDrawer, close: closeFavoritesDrawer }] =
    useDisclosure(false);

  const handleOpenDrawer = (type: SelectedDrawerType) => {
    switch (type) {
      case 'favorites':
        openFavoritesDrawer();
        break;

      default:
        break;
    }
  };

  const handleOpenModal = (type: ModalType) => {
    switch (type) {
      case 'settings':
        openSettingsModal();
        break;

      case 'account':
        openAccountModal();
        break;

      case 'support':
        openSupportModal();
        break;

      case 'signOut':
        openSignOutModal();
        break;

      default:
        break;
    }
  };

  return isLoggedIn ? (
    <>
      <SignedInBar handleOpenDrawer={handleOpenDrawer} handleOpenModal={handleOpenModal} />

      <AccountModal isVisible={isAccountModalVisible} handleCloseModal={closeAccountsModal} />

      <SettingsModal isVisible={isSettingsModalVisible} handleCloseModal={closeSettingsModal} />

      <SupportModal isVisible={isSupportModalVisible} handleCloseModal={closeSupportModal} />

      <SignOutModal isVisible={isSignOutModalVisible} handleCloseModal={closeSignOutModal} />

      <FavoritesDrawer
        isVisible={isFavoritesDrawerVisible}
        handleCloseDrawer={closeFavoritesDrawer}
      />
    </>
  ) : (
    <Text
      // c="dimmed"
      ml="md"
      // size="sm"
      className="cursor_pointer  hover_color"
      onClick={openAuthModal}
      w="100%"
      miw={80}
      ta="center"
    >
      {t('sign_in')}
    </Text>
  );
};

export default Profile;
