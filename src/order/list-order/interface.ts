import { IMetaResponse, IOrder, IProduct } from '../common/interface.common';

export interface IProductParams {
  page: number;
  limit: number;
}

export interface IProductResponse {
  data: {
    items: IProduct[];
    meta: IMetaResponse;
  };
  message: string;
  status: string;
}

export interface ITransferProduct {
  items: IProduct[];
  meta: IMetaResponse;
}

export interface IPropTableRow {
  row: IOrder;
  // selected: boolean;
  // onSelectRow: (checked: boolean) => void;
  // onDeleteRow: VoidFunction;
  // onEditRow: VoidFunction;
  // onDetailRow: VoidFunction;
}
