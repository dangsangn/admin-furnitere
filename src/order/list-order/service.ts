import { API_GET_ORDER, API_GET_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductParams, IProductResponse } from './interface';

export const getOrder = async (params: IProductParams) => {
  return axiosInstance.get<unknown, IProductResponse>(`${API_GET_ORDER}`, {
    params,
  });
};

export const deleteProduct = async (id: string | number) => {
  return axiosInstance.delete<unknown, IProductResponse>(`${API_GET_PRODUCT}/${id}`);
};

export const getOrderStatusList = () => {
  return axiosInstance.get<unknown, IProductResponse>('/order/status?papge=1&limit=20');
};
