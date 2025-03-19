import { IconCheck, IconExclamationMark, IconX } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

type NotificationProps = {
  type?: 'error' | 'success' | 'warning';
  title?: string;
  message: string;
};

const COLORS = {
  error: 'red',
  success: 'green',
  warning: 'yellow',
};

const ICONS = {
  error: <IconX />,
  success: <IconCheck />,
  warning: <IconExclamationMark />,
};

const Notification = ({ type = 'success', title, message }: NotificationProps) => {
  return notifications.show({
    position: 'top-right',
    autoClose: 3000,
    color: COLORS[type],
    icon: ICONS[type],
    message,
    title: title || '',
  });
};

export default Notification;
