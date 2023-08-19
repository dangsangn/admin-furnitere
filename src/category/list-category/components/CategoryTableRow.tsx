import { MenuItem, TableCell, TableRow } from '@mui/material';
import { TableMoreMenu } from '../../../common/components/table';
import Iconify from '../../../common/components/Iconify';
import vn from '../../../common/locales/vn';
import { IPropsTableRow } from 'src/category/common/interface';
import React, { useState } from 'react';

const CategoryTableRow = (props: IPropsTableRow) => {
  const { id, name, description } = props.row;

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
      <TableCell align="center" sx={{ width: '150px' }}>
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
        {name?.length > 30 ? name.slice(0, 35) + '...' : name}
      </TableCell>
      <TableCell
        align="left"
        // onClick={onDetailRow}
      >
        {description}
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
                {vn.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.onEditRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {vn.edit}
              </MenuItem>
            </>
          }
        ></TableMoreMenu>
      </TableCell>
    </TableRow>
  );
};

export default CategoryTableRow;
