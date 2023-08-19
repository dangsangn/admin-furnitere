import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import vn from '../../../common/locales/vn';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useGetOrderStatus } from '../hooks/useGetOrderStatus';

export default function ProductHeader() {
  const { data: orderStatusList } = useGetOrderStatus();
  const navigate = useNavigate();
  const handleChangeStatus = async (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    if (value) {
      navigate('/dashboard/order_management/list?order_status=' + value);
    } else {
      navigate('/dashboard/order_management/list');
    }
  };

  return (
    <>
      <HeaderBreadcrumbs
        heading={vn.ListOrder.title}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.ORDER, href: PATH_DASHBOARD.order_management.list },
          { name: vn.ListOrder.list },
        ]}
        action={
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Nhóm theo trạng thái</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              onChange={handleChangeStatus}
              sx={{ width: '200px' }}
              label="Nhóm theo trạng thái"
            >
              <MenuItem value={'all'}>Tất cả</MenuItem>
              {(orderStatusList || []).map((item) => (
                <MenuItem key={item?.id} value={item?.id}>
                  {item?.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        }
      />
    </>
  );
}
