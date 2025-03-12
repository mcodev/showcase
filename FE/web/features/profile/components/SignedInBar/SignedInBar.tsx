import React from 'react';
import { useRouter } from 'next/router';
import {
  IconArrowBigUpFilled,
  IconCalendar,
  IconHeart,
  IconLifebuoy,
  IconLogout,
  IconScissors,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useTranslation } from 'react-i18next';
import { Avatar, Flex, Indicator, Menu, Tooltip } from '@mantine/core';
import { useUserContext } from '../../../../providers/UserProvider';
import { ModalType, SelectedDrawerType } from '../../types';

type SignedInBarProps = {
  handleOpenDrawer: (type: SelectedDrawerType) => void;
  handleOpenModal: (type: ModalType) => void;
};

const SignedInBar = ({ handleOpenDrawer, handleOpenModal }: SignedInBarProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const { isUserProfessional, isUserClient } = useUserContext();

  const DROPDOWN_MENU_ITEMS = [
    { value: 'account', label: 'account', icon: IconUser, isVisible: true },
    { value: 'settings', label: 'settings', icon: IconSettings, isVisible: true },
    { value: 'shop_details', label: 'edit', icon: IconScissors, isVisible: isUserProfessional },
    {
      value: 'upgrade',
      label: 'upgrade',
      icon: IconArrowBigUpFilled,
      // isVisible: isUserProfessional,
      isVisible: false,
    },
    { value: 'support', label: 'support', icon: IconLifebuoy, isVisible: true },
    { value: 'signOut', label: 'sign_out', icon: IconLogout, isVisible: true },
  ];

  return (
    <Flex align="center">
      <Tooltip
        label={t(isUserClient ? 'show_my_appointments' : 'view_appointments')}
        offset={10}
        openDelay={500}
      >
        <Indicator disabled withBorder mr={16} className="cursor_pointer flex">
          <IconCalendar
            size={24}
            color="gray"
            onClick={() =>
              isUserClient ? handleOpenDrawer('user_appointments') : router.push('/appointments')
            }
          />
        </Indicator>
      </Tooltip>

      {isUserClient && (
        <Tooltip label={t('show_my_favorites')} offset={10} openDelay={500}>
          <Indicator disabled withBorder mr={16} className="cursor_pointer flex">
            <IconHeart size={24} color="gray" onClick={() => handleOpenDrawer('favorites')} />
          </Indicator>
        </Tooltip>
      )}

      <Menu shadow="md" width={200}>
        <Menu.Target>
          <Tooltip label={t('view_app_settings')} offset={10} openDelay={1000}>
            {isUserClient ? (
              <Avatar color="indigo" className="cursor_pointer" size={32} draggable={false}>
                {/* {userDetails?.name && getAvatarUserName(userDetails?.name)} */}
              </Avatar>
            ) : (
              <Indicator disabled withBorder mr={16} className="cursor_pointer flex">
                <IconSettings size={30} color="gray" className="cursor_pointer" />
              </Indicator>
            )}
          </Tooltip>
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Label>{t('profile')}</Menu.Label>

          {DROPDOWN_MENU_ITEMS.map(
            (item, index) =>
              item.isVisible && (
                <React.Fragment key={item.value}>
                  <Menu.Item
                    leftSection={<item.icon size={14} />}
                    onClick={() => handleOpenModal(item.value as ModalType)}
                  >
                    {t(item.label)}
                  </Menu.Item>

                  {index === DROPDOWN_MENU_ITEMS.length - 2 && <Menu.Divider />}
                </React.Fragment>
              )
          )}
        </Menu.Dropdown>
      </Menu>
    </Flex>
  );
};

export default SignedInBar;
