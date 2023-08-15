import { API_TAG } from './../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataTagDelete, IParams, IResTagList } from './interface';

export const getListTag = (params: IParams) => {
  return axiosInstance.get<any, IResTagList>(API_TAG, { params });
};

export const deleteMultiTag = (data: IDataTagDelete) => {
  return axiosInstance.delete(API_TAG, { data });
};
