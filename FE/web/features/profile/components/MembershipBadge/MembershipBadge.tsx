import React from 'react';
import { useTranslation } from 'react-i18next';
import { Badge } from '@mantine/core';
import { useUserContext } from '../../../../providers/UserProvider';

// const memberStyles = {
//   trial: 'var(--mantine-color-gray-4)',
//   silver: '#bdbdbd',
//   gold: '#f0bf43',
// };

const MembershipBadge = () => {
  const { userDetails, isUserProfessional } = useUserContext();
  const { t } = useTranslation();

  return isUserProfessional && userDetails?.type ? (
    <Badge
      // color={memberStyles[userDetails?.subscription || 'trial']}
      size="md"
      radius="xs"
      draggable={false}
      className="prevent_select"
    >
      {t(`${userDetails.subscription}_badge`)}
    </Badge>
  ) : null;
};

export default MembershipBadge;
