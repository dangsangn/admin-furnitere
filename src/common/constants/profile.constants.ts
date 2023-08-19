import { PATH_DASHBOARD } from '../routes/paths';
import i18n from '../locales/i18n';

export const ACCOUNT_MENU_OPTIONS = [
  {
    label: i18n.t('home'),
    linkTo: '/',
  },
  {
    label: 'Đổi mật khẩu',
    linkTo: PATH_DASHBOARD.user.changePassword,
  },
  {
    label: 'Cập nhật thông tin',
    linkTo: PATH_DASHBOARD.user.editProfile,
  },
];
