import vn from 'src/common/locales/vn';
import {BREADCUMBS} from 'src/common/constants/common.constants';
import {PATH_DASHBOARD} from 'src/common/routes/paths';
import {Button} from '@mui/material';
import Iconify from 'src/common/components/Iconify';
import {Link as RouterLink} from 'react-router-dom';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';

const CategoryHeader = () => {
  return (
    <HeaderBreadcrumbs
      heading={vn.category.list}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name:vn.category.list, href: PATH_DASHBOARD.category.list },
        { name: vn.category.list },
      ]}
      action={
        <Button
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          to={PATH_DASHBOARD.category.new}
          component={RouterLink}
        >
          {vn.category.new.title}
        </Button>
      }
    />
  );
};

export default CategoryHeader;
