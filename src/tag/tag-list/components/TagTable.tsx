import {
  Box,
  FormControlLabel,
  Switch,
  TablePagination,
  Paper,
  TableContainer,
  Table,
  TableBody,
  Tooltip,
  IconButton,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import {
  TableHeadCustom,
  TableNoData,
  TableSelectedActions,
} from '../../../common/components/table';
import useMessage from '../../../common/hooks/useMessage';
import { useSelectMultiple } from '../../../common/hooks/useSelectMultiple';
import useTable from '../../../common/hooks/useTable';
import en from '../../../common/locales/en';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { replacePathParams } from '../../../common/utils/replaceParams';
import { HEAD_TABLE_PROPS } from '../constant';
import { useDeleteMultiTag } from '../hooks/useDeleteMultiTag';
import { useGetListTag } from '../hooks/useGetListTag';
import { IParams } from '../interface';
import TagTableRow from './TagTableRow';
import { RootState, dispatch } from '../../../common/redux/store';
import { setIdsDelete, setPopupDelete } from '../tag.slice';
import { useSelector } from 'react-redux';
import TagFilter from './TagFilter';
import LoadingTableSkeleton from '../../../common/components/LoadingTableSkeleton';

export default function TagTable() {
  const {
    dense,
    page,
    setPage,
    rowsPerPage,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { tagFilter } = useSelector((state: RootState) => state.tagList);
  const searchParams: IParams = {
    page: page + 1,
    limit: rowsPerPage,
    type: tagFilter.type,
  };

  const { data, isLoading } = useGetListTag(searchParams);
  const tagList = data?.items || [];

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const navigate = useNavigate();
  const {
    isCheckedAll,
    reset: resetSelect,
    selectedIds,
    handleSelectItem,
    handleCheckAll,
  } = useSelectMultiple(tagList.map((v) => v.id) || [], page + 1);

  // const { mutate } = useDeleteMultiTag();

  const handleDeleteRows = (id: number[]) => {
    // mutate({ ids: id });
    dispatch(setPopupDelete(true));
    dispatch(setIdsDelete(id));
    resetSelect();
  };
  const handleEditRow = (idTag: number) => {
    navigate(replacePathParams(PATH_DASHBOARD.tag.edit, { id: idTag }));
  };

  const isNotFound = !tagList.length && !isLoading;
  const totalItem = data?.meta.totalItems || 0;

  return (
    <Paper elevation={3} sx={{ paddingTop: 1 }}>
      <TagFilter onSetPage={setPage} />
      <TableContainer sx={{ minWidth: 200, position: 'relative' }}>
        {!!selectedIds.length && (
          <TableSelectedActions
            dense={dense}
            isSelectAll={isCheckedAll}
            numSelected={selectedIds.length}
            rowCount={tagList.length}
            onSelectAllRows={handleCheckAll}
            actions={
              <Tooltip title={en.delete}>
                <IconButton color="primary" onClick={() => handleDeleteRows(selectedIds)}>
                  <Iconify icon={'eva:trash-2-outline'} />
                </IconButton>
              </Tooltip>
            }
          />
        )}
        <Table size={dense ? 'small' : 'medium'}>
          <TableHeadCustom
            headLabel={HEAD_TABLE_PROPS}
            rowCount={tagList.length}
            numSelected={selectedIds.length}
            isSelectAll={isCheckedAll}
            onSelectAllRows={handleCheckAll}
          />
          <TableBody>
            {tagList.map((row) => (
              <TagTableRow
                key={row.id}
                row={row}
                selected={selectedIds.includes(row.id)}
                onSelectRow={(e) => handleSelectItem(row.id, e)}
                onEditRow={() => handleEditRow(row.id)}
              />
            ))}
            <TableNoData isNotFound={isNotFound} />
            {isLoading && (
              <LoadingTableSkeleton
                row={rowsPerPage}
                column={HEAD_TABLE_PROPS.length + 1}
              />
            )}
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
          label="Dense"
          sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
        />
      </Box>
    </Paper>
  );
}
