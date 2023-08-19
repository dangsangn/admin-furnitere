import {
  Box,
  FormControlLabel,
  Paper,
  Switch,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@mui/material';
import {
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '../../../common/components/table';
import useMessage from '../../../common/hooks/useMessage';
import useTable from '../../../common/hooks/useTable';
import { HEAD_TABLE_PROPS } from '../constants';
import { useGetUsers } from '../hooks/useGetUsers';
import { IProductParams } from '../interface';
import UserTableRow from './UserTableRow';

const UserTable = () => {
  const { dense, page, rowsPerPage, onChangeDense, onChangePage, onChangeRowsPerPage } =
    useTable();

  const searchParams: IProductParams = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const { data: userList, isLoading, isError } = useGetUsers(searchParams);
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const totalItem = userList?.meta?.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      {/* <ProductFilter onSetPage={setPage} /> */}
      {/* <ModalConfirmDelete /> */}
      <TableContainer sx={{ position: 'relative' }}>
        {/* {!!selectedIds.length && (
      <TableSelectedActions
        dense={dense}
        isSelectAll={isCheckedAll}
        numSelected={selectedIds.length}
        rowCount={userList?.items?.length || 0}
        onSelectAllRows={handleCheckAll}
        actions={
          <Tooltip title={vn.ListProduct.delete}>
            <IconButton color="primary" onClick={() => handleDeleteRows(selectedIds)}>
              <Iconify icon={'eva:trash-2-outline'} />
            </IconButton>
          </Tooltip>
        }
      />
    )} */}
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            rowCount={userList?.items?.length}
            // numSelected={selectedIds.length}
            // isSelectAll={isCheckedAll}
            // onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {userList?.items?.map((row: any) => (
              <UserTableRow
                key={row.id}
                row={row}
                // selected={selectedIds.includes(row.id)}
                // onSelectRow={(e) => handleSelectItem(row.id, e)}
                // onDeleteRow={() => {
                //   handleDeleteRows([row.id]);
                // }}
                // onEditRow={() => handleEditProduct(row.id)}
                // onDetailRow={() => handleDetailProduct(row.id)}
              />
            ))}
            {isLoading &&
              Array.from(Array(rowsPerPage)).map((e, i) => <TableSkeleton key={i} />)}
            <TableNoData isNotFound={isError} />
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ position: 'relative' }}>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={totalItem}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
        <FormControlLabel
          control={<Switch checked={dense} onChange={onChangeDense} />}
          label={'Thu gọn'}
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
};

export default UserTable;
