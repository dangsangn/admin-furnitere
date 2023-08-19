import useTable from 'src/common/hooks/useTable';
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
import { TableHeadCustom, TableNoData, TableSkeleton } from 'src/common/components/table';
import React from 'react';
import useGetCategory from 'src/category/list-category/hooks/useGetCategory';
import { IPageAndLimitParams } from 'src/product/common/interface.common';
import { ICategory } from 'src/category/common/interface';
import CategoryTableRow from './CategoryTableRow';
import { HEAD_TABLE_PROPS } from 'src/category/constants';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';

const CategoryTable = () => {
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

  const navigate = useNavigate();
  const searchParams: IPageAndLimitParams = {
    page: page + 1,
    limit: rowsPerPage,
  };
  const { data: categoryList, isLoading, isError } = useGetCategory(searchParams);

  const totalItem = categoryList?.meta?.totalItems || 0;

  const editHandler = (id: number) => () => {
    navigate(PATH_DASHBOARD.category.edit(id));
  };
  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <TableContainer sx={{ position: 'relative' }}>
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            rowCount={categoryList?.items?.length}
          />
          <TableBody>
            {categoryList?.items?.map((row: ICategory) => (
              <CategoryTableRow
                key={row.id}
                row={row}
                // row={row}
                // selected={selectedIds.includes(row.id)}
                // onSelectRow={(e) => handleSelectItem(row.id, e)}
                // onDeleteRow={() => {
                //   handleDeleteRows([row.id]);
                // }}
                onEditRow={editHandler(row.id)}
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

export default CategoryTable;
