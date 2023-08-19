import { IMetaResponse, IUser } from '../common/interface.common';

export interface IProductParams {
  page: number;
  limit: number;
}

export interface IProductResponse {
  data: {
    items: IUser[];
    meta: IMetaResponse;
  };
  message: string;
  status: string;
}

export interface ITransferProduct {
  items: IUser[];
  meta: IMetaResponse;
}

export interface IPropTableRow {
  row: IUser;
  // selected: boolean;
  // onSelectRow: (checked: boolean) => void;
  // onDeleteRow: VoidFunction;
  // onEditRow: VoidFunction;
  // onDetailRow: VoidFunction;
}
