import React, { useState } from 'react';
import { IPropTableRow } from '../interface';
import { Checkbox, TableRow, TableCell, Box, MenuItem } from '@mui/material';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import vn from '../../../common/locales/vn';

const ProductTableRow = ({
  row,
}: // selected,
// onSelectRow,
// onDeleteRow,
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

  const handleOpenMenu = (category: React.MouseEvent<HTMLElement>) => {
    setOpenMenuActions(category.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
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
                  // onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {vn.ListProduct.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  // onEditRow();
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
