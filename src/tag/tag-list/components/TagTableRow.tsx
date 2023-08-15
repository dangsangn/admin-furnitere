import { TableRow, TableCell, MenuItem, Checkbox, Chip } from '@mui/material';
import { useState } from 'react';
import Iconify from '../../../common/components/Iconify';
import { TableMoreMenu } from '../../../common/components/table';
import en from '../../../common/locales/en';
import { dispatch } from '../../../common/redux/store';
import { IPropTagTableRow } from '../interface';
import { setIdsDelete, setPopupDelete } from '../tag.slice';
import { ITypeTag } from '../constant';

export default function TagTableRow({
  row,
  selected,
  onSelectRow,
  onEditRow,
}: IPropTagTableRow) {
  const [openMenu, setOpenMenu] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (e: React.MouseEvent<HTMLElement>) => {
    setOpenMenu(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenu(null);
  };
  return (
    <TableRow hover selected={selected}>
      <TableCell align="left">
        <Checkbox checked={selected} onChange={(e) => onSelectRow(e.target.checked)} />
      </TableCell>
      <TableCell align="center">{row.id}</TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell align="center">
        <Chip
          label={row?.type}
          sx={{
            color: 'white',
            minWidth: '100px',
            fontWeight: 900,
            borderRadius: '5px',
            background:
              row?.type === ITypeTag.CUSTOMER
                ? 'linear-gradient(to left top, #C0EEF2, #03C988)'
                : 'linear-gradient(to left bottom, #F55050, #FFACAC)',
          }}
        />
      </TableCell>
      <TableCell align="center">{row.description}</TableCell>
      <TableCell align="center">
        <TableMoreMenu
          open={openMenu}
          onClose={handleCloseMenu}
          onOpen={handleOpenMenu}
          actions={
            <>
              <MenuItem
                onClick={(e) => {
                  dispatch(setIdsDelete([row.id]));
                  dispatch(setPopupDelete(true));
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                {en.delete}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleCloseMenu();
                  onEditRow();
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                {en.edit}
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
