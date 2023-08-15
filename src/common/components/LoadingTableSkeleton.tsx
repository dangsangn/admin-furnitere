import { Skeleton, TableCell, TableRow } from '@mui/material';

type Props = {
  row: number;
  column: number;
};
export default function LoadingTableSkeleton({ row, column }: Props) {
  return (
    <>
      {Array.from(Array(row)).map((rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {Array.from(Array(column)).map((index) => (
              <TableCell align="left" key={index}>
                <Skeleton />
              </TableCell>
            ))}
          </TableRow>
        );
      })}
    </>
  );
}
