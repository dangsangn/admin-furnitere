import { MenuItem, Select, SelectChangeEvent, TableCell, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import axiosInstance from '../../../common/utils/axios';
import { useGetOrderStatus } from '../hooks/useGetOrderStatus';
import { IPropTableRow } from '../interface';
import { useSnackbar } from 'notistack';
import { useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { useNavigate } from 'react-router-dom';

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'VND',

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});

const ProductTableRow = ({
  row,
}: // onDeleteRow,
// selected,
// onSelectRow,
// onEditRow,
// onDetailRow,
IPropTableRow) => {
  const { id, customer, order_date, order_status, total, order_type } = row;
  const { data: orderStatusList } = useGetOrderStatus();
  const [orderStatus, setOrderStatus] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderStatusList && order_status) {
      const find = (orderStatusList || []).find((item) => {
        return item.name === order_status;
      });
      if (find) setOrderStatus(String(find?.id));
    }
  }, [orderStatusList, order_status]);

  const handleChangeStatus = async (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setOrderStatus(value);
    try {
      axiosInstance.post('order/change-status', {
        id,
        status_id: value,
      });
      enqueueSnackbar('Bạn đã cập nhật trạng thái', {
        variant: 'success',
        autoHideDuration: 1000,
      });
      queryClient.invalidateQueries([QUERY_KEYS.ORDER_LIST]);
    } catch (error) {}
  };

  const handleDirectDetailOrder = () => {
    navigate('/dashboard/order_management/detail/' + id);
  };

  return (
    <TableRow hover>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
        onClick={handleDirectDetailOrder}
      >
        {id}
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {customer.name?.length > 30 ? customer.name.slice(0, 35) + '...' : customer.name}
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {formatter.format(+total)}
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={orderStatus}
          onChange={handleChangeStatus}
          sx={{ width: '100%' }}
        >
          {(orderStatusList || []).map((item) => (
            <MenuItem key={item?.id} value={item?.id}>
              {item?.name}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {order_type}
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {dayjs(order_date).format('DD-MM-YYYY')}
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
