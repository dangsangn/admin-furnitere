import { API_GET_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductParams, IProductResponse } from './interface';

export const getProduct = async (params: IProductParams) => {
  return axiosInstance.get<unknown, IProductResponse>(`${API_GET_PRODUCT}`, {
    params: params,
  });
};
