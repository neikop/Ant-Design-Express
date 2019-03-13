import {notification} from 'antd';

const setting = () => {
  notification.config({
    placement: 'bottomRight',
  });
};

export const alert = {
  setting,
};

export const alertAgent = notification;
