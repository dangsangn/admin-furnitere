import { Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import Iconify from '../../../common/components/Iconify';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function ProductHeader() {
  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.ListProduct.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.PRODUCT_VN, href: PATH_DASHBOARD.product.list },
          { name: vn.ListProduct.list },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon={'eva:plus-fill'} />}
            to={PATH_DASHBOARD.product.new}
            component={RouterLink}
          >
            {vn.ListProduct.newProduct}
          </Button>
        }
      />
    </>
  );
}
