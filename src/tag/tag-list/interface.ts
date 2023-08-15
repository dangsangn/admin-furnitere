export interface IResTagList {
  items: ITagItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface ITagItem {
  id: number;
  name: string;
  slug: string;
  description: string;
  type: string;
}

export interface IParams {
  page: number;
  limit: number;
  type?: string;
}

export interface IPropTagTableRow {
  row: ITagItem;
  selected: boolean;
  onSelectRow: (checked: boolean) => void;
  onEditRow: VoidFunction;
}

export interface IDataTagDelete {
  ids: number[];
}

export interface ITagFilter {
  type: string;
}
export interface IStateProps {
  idsDelete: number[];
  isPopupDelete: boolean;
  tagFilter: ITagFilter;
}

export type ICallback = {
  onSuccess: VoidFunction;
  onError: VoidFunction;
};

export interface IFormFilterTag {
  type: { id: string; name: string } | null;
  searchText: string;
}
