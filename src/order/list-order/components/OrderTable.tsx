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
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  TableHeadCustom,
  TableNoData,
  TableSkeleton,
} from '../../../common/components/table';
import useTable from '../../../common/hooks/useTable';
import { HEAD_TABLE_PROPS } from '../constants';
import { useGetOrder } from '../hooks/useGetOrder';
import ProductTableRow from './OrderTableRow';

const ProductTable = () => {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    selected: selectedRows,
    setPage,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const [searchParams] = useSearchParams();
  const orderStatus = searchParams.get('order_status');
  const [query, setQuery] = useState<{
    page: number;
    limit: number;
    id?: number | string;
  }>({ page: page + 1, limit: rowsPerPage });

  const { data: orderList, isLoading, isError } = useGetOrder(query);

  const totalItem = orderList?.meta?.totalItems || 0;

  useEffect(() => {
    if (orderStatus) {
      if (orderStatus !== 'all') {
        setQuery((pre) => ({ ...pre, id: orderStatus }));
      } else {
        setQuery((pre) => ({ page: pre.page, limit: pre.limit }));
      }
    }
    setQuery((pre) => ({ ...pre, page: page + 1, limit: rowsPerPage }));
  }, [orderStatus, page, rowsPerPage]);

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
        rowCount={orderList?.items?.length || 0}
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
            rowCount={orderList?.items?.length}
            // numSelected={selectedIds.length}
            // isSelectAll={isCheckedAll}
            // onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {orderList?.items?.map((row: any) => (
              <ProductTableRow
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

export default ProductTable;
