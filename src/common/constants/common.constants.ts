import { Lang, LangObj } from './common.interfaces';

export const LANG: Record<Lang, Lang> = {
  en: 'en',
  vi: 'vi',
};

export const langs: Record<Lang, LangObj> = {
  en: {
    label: 'English',
    value: 'en',
    icon: '/assets/icons/flags/ic_flag_en.svg',
  },
  vi: {
    label: 'Vietnamese',
    value: 'vi',
    icon: '/assets/icons/flags/ic_flag_vn.svg',
  },
};
export const DATE_FORMAT = 'dd.MM.yyyy';

export enum BooleanEnum {
  TRUE = 1,
  FALSE = -1,
}

export const FIELD = {
  WOOD: 'wood',
};

export const BREADCUMBS = {
  DASHBOARD: 'Dashboard',
  LIST_EVENT: 'Sự kiện Promotion quý 4',
  CREATE_EVENT: 'Tạo mới sự kiện',
  VIEW_EVENT: 'Xem sự kiện',
  PRODUCT_VN: 'Sản phẩm',
  LIST_TAG: 'Danh sách tag',
  TAGS: 'Tags',
  EDIT_TAG: 'Chỉnh sửa Tag',
  PRODUCT_NEW_VN: 'Thêm mới sản phẩm',
};
export const FORMAT_DATE_FILTER = 'MM-DD-YYYY HH:mm:ss';
export const DEFAULT_MAIN_COLOR = '#C5DFF8';
