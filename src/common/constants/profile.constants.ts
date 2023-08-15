import { PATH_DASHBOARD } from '../routes/paths';
import i18n from '../locales/i18n';

export const ACCOUNT_MENU_OPTIONS = [
  {
    label: i18n.t('home'),
    linkTo: '/',
  },
  {
    label: i18n.t('profile'),
    linkTo: PATH_DASHBOARD.merchant.settings,
  },
  {
    label: i18n.t('settings'),
    linkTo: PATH_DASHBOARD.general.app,
  },
];
