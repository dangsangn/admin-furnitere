export type Fields = 'ALL' | 'WOOD';
export type Lang = 'en' | 'vi';
export type FileType = 'png' | 'jpg' | 'jpeg' | 'pdf';

export enum LANG {
  VI = 'vi',
  EN = 'en',
}
export interface PresignedResponse {
  id: number;
  url: string;
}
export interface BaseResponse {
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  version: number;
  id: number;
}
export interface ImageResponse {
  id: number;
  key: string;
  type: FileType;
  url: string | null;
  fileName?: string;
}

export interface ThumbnailCategory {
  id: number;
  url: string | null;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
}

export interface ErrorResponse {
  statusCode: number;
  message: string | string[];
  error: string;
}

export interface LangObj {
  label: string;
  value: Lang;
  icon: string;
}
export interface SearchParams {
  page?: number;
  size?: number;
  keyWord?: string;
  field?: Fields;
}

export type ISelectedLang = {
  payload: LangObj;
  type: string;
};

export enum MessageType {
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface IShowMessage {
  type: MessageType;
  message: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface MutationCallback {
  onSuccess?: VoidFunction;
  onError?: VoidFunction;
}

export interface DeleteMultipleResponse {
  affected: number;
}

export enum Action {
  MANAGE = 'manage',
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
}

export enum Resource {
  ALL = 'all',
  ADMIN = 'admin',
  MERCHANT = 'merchant',
  CUSTOMER = 'customer',
  GROUP_POLICY = 'group_policy',
  GIFT = 'gift',
  EVENT = 'event',
  EVENT_CODE = 'event_code',
  PRODUCT = 'product',
  FILE_REQUEST = 'file_request',
  USER_REQUEST_DOWNLOAD = 'user_request_download',
  CRON_JOB = 'cron_job',
  AGENT = 'agent',
  CART = 'cart',
  ORDER = 'order',
  CATEGORY = 'category',
  TAG = 'tag',
  SURVEY = 'survey',
  SYSTEM_CONFIG = 'system_config',
  SECRET = 'secret',
  SYSTEM_CONFIG_POINT = 'system_config_point',
  ADD_POINT_CODE = 'add_point_code',
  EXPORT = 'export',
  TIER_CONFIG = 'tier_config',
  NEWS = 'news',
  NEWS_SUBJECT = 'news_subject',
  TERMS_POLICY = 'terms_policy',
  GAME = 'GAME',
  REFERRAL = 'referral',
  IMPORT = 'import',
  STORE = 'STORE',
  SUBJECT = 'SUBJECT',
  FEEDBACK_ANSWER = 'FEEDBACK_ANSWER',
  STATISTIC = 'STATISTIC',
  E_WALLET = 'E_WALLET',
}

export enum ActionAbility {
  CAN = 'can',
  CANNOT = 'cannot',
}

export interface IResListPage {
  itemCount: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}
