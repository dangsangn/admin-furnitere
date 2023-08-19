import { MenuItem, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import vn from '../../../common/locales/vn';
import { useDeleteUser } from '../hooks/useDeleteUser';
import { IPropTableRow } from '../interface';

const UserTableRow = ({
  row,
}: // onDeleteRow,
// selected,
// onSelectRow,
// onEditRow,
// onDetailRow,
IPropTableRow) => {
  const { id, email, name, phone, address, baseSalary, roleId, isActive } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { mutate: deleteUser } = useDeleteUser();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  const onDeleteRow = () => {
    deleteUser(row.id, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_USER]);
        enqueueSnackbar('ẨN Nhân viên thành công', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      },
    });
  };

  const onEditRow = () => {
    navigate('/dashboard/user/new?id=' + row.id);
  };

  return (
    <TableRow hover>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {email}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {name}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {phone}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {address}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {baseSalary}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {roleId === 1 ? 'Admin' : 'Nhân viên'}
      </TableCell>
      <TableCell
        align="left"
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {isActive ? <span style={{ color: 'green' }}>Hoạt động</span> : 'Đã ẩn'}
      </TableCell>
      <TableCell align="left">
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {vn.ListProduct.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {vn.ListProduct.edit}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
