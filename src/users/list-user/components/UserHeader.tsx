import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import Iconify from '../../../common/components/Iconify';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function UserHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.ListUser.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.USER, href: PATH_DASHBOARD.user.list },
          { name: vn.ListUser.list },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.user.new}
            component={RouterLink}
          >
            {vn.ListUser.newUser}
          </Button>
        }
      />
    </>
  );
}
