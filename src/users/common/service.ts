import { ICategoryResponse } from '../../category/common/interface';
import { API_CATEGORY, API_SUPPLIER } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IPageAndLimitParams } from './interface.common';

export const getProductCategory = (params: IPageAndLimitParams) =>
  axiosInstance
    .get<unknown, ICategoryResponse>(`${API_CATEGORY}`, { params })
    .then((res) => res.data);

export const getSupplier = (params: IPageAndLimitParams) =>
  axiosInstance.get<unknown, any>(`${API_SUPPLIER}`, { params }).then((res) => res.data);
