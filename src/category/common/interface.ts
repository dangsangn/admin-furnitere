import { IMetaResponse } from '../../product/common/interface.common';

export interface ICategory {
  id: number;
  name: string;
  description: string;
}

export interface ITransferCategory {
  items: ICategory[];
  meta: IMetaResponse;
}

export interface ICategoryResponse {
  status: string;
  message: string;
  data: ITransferCategory;
}

export interface IPropsTableRow {
  row: ICategory;
  // selected: boolean;
  // onSelectRow: (checked: boolean) => void;
  // onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
  // onDetailRow: VoidFunction;
}
