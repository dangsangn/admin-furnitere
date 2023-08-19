// routes
import { PATH_AUTH, PATH_PAGE } from '../../routes/paths';
// components
import { PATH_AFTER_LOGIN } from '../../../config';
// components
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    icon: <Iconify icon={'eva:home-fill'} {...ICON_SIZE} />,
    path: '/',
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify icon={'eva:file-fill'} {...ICON_SIZE} />,
    children: [
      {
        subheader: 'Authentication',
        items: [
          { title: 'Login', path: PATH_AUTH.loginUnprotected, roleId: 2 },
          { title: 'Register', path: PATH_AUTH.registerUnprotected, roleId: 2 },
          { title: 'Reset password', path: PATH_AUTH.resetPassword, roleId: 2 },
          { title: 'Verify code', path: PATH_AUTH.verify, roleId: 2 },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: PATH_PAGE.page403, roleId: 2 },
          { title: 'Page 404', path: PATH_PAGE.page404, roleId: 2 },
          { title: 'Page 500', path: PATH_PAGE.page500, roleId: 2 },
        ],
      },
      {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: PATH_AFTER_LOGIN, roleId: 2 }],
      },
    ],
  },
];

export default menuConfig;
