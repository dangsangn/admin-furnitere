import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import vn from 'src/common/locales/vn';

const EditHeader = () => {
  return (
    <HeaderBreadcrumbs
      heading={vn.category.edit.title}
      links={[
        { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
        { name: vn.category.edit.title, href: PATH_DASHBOARD.category.root },
      ]}
    />
  );
};
export default EditHeader;
