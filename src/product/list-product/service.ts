import { API_GET_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductParams, IProductResponse } from './interface';

export const getProduct = async (params: IProductParams) => {
  return axiosInstance.get<unknown, IProductResponse>(`${API_GET_PRODUCT}`, {
    params: params,
  });
};

export const deleteProduct = async (id: string | number) => {
  return axiosInstance.delete<unknown, IProductResponse>(`${API_GET_PRODUCT}/${id}`);
};
