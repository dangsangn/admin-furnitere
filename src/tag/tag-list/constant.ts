export const HEAD_TABLE_PROPS = [
  {
    id: 'ID',
    label: 'ID',
    align: 'center',
  },
  {
    id: 'name',
    label: 'Tên',
    align: 'center',
  },
  {
    id: 'tag',
    label: 'Loại',
    align: 'center',
  },
  {
    id: 'description',
    label: 'Mô tả',
    align: 'center',
  },

  { label: 'Tùy chọn', align: 'center' },
];

export enum ITypeTag {
  CUSTOMER = 'USER',
  PRODUCT = 'PRODUCT',
}

export const TYPE_TAGS = [
  { id: 'USER', name: 'USER' },
  { id: 'PRODUCT', name: 'PRODUCT' },
];
