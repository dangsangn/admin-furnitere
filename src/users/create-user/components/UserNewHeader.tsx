import { useSearchParams } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

const UserNewHeader = () => {
  const [searchParams] = useSearchParams();
  const idUser = searchParams.get('id');
  return (
    <>
      <HeaderBreadcrumbs
        heading={idUser ? 'Cập nhật Nhân viên' : 'Thêm nhân viên'}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.USER_NEW_VN, href: PATH_DASHBOARD.user.new },
          { name: idUser ? 'Cập nhật Nhân viên' : 'Thêm nhân viên' },
        ]}
      />
    </>
  );
};

export default UserNewHeader;
