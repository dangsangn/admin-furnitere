import { Box, MenuItem, TableCell, TableRow } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import vn from '../../../common/locales/vn';
import { useDeleteProduct } from '../hooks/useDeletProduct';
import { IPropTableRow } from '../interface';
import { useNavigate } from 'react-router-dom';

const ProductTableRow = ({
  row,
}: // onDeleteRow,
// selected,
// onSelectRow,
// onEditRow,
// onDetailRow,
IPropTableRow) => {
  const {
    categoryId,
    description,
    imageUrl,
    isActive,
    name,
    price,
    qty,
    suplierId,
    unit,
  } = row;

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);
  const { mutate: deleteProduct } = useDeleteProduct();
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
    deleteProduct(row.id, {
      onSuccess: () => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_PRODUCT]);
        enqueueSnackbar('Xoa san pham thanh cong', {
          variant: 'success',
          autoHideDuration: 1000,
        });
      },
    });
  };

  const onEditRow = () => {
    navigate('/dashboard/product/new?id=' + row.id);
  };

  return (
    <TableRow hover>
      <TableCell align="left" padding="checkbox">
        {/* <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} /> */}
      </TableCell>
      <TableCell align="left" sx={{ width: '100px' }}>
        <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            borderRadius: '7px',
            objectFit: 'cover',
          }}
          alt={name}
          src={`${imageUrl}`}
        />
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {name?.length > 30 ? name.slice(0, 35) + '...' : name}
      </TableCell>
      <TableCell
        align="center"
        // onClick={onDetailRow}
        sx={{
          '&:hover': { color: 'red', cursor: 'pointer' },
          fontWeight: 'bold',
        }}
      >
        {isActive ? 'Hoạt động' : 'Đã ẩn'}
      </TableCell>
      <TableCell align="center">
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

export default ProductTableRow;
