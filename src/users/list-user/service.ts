import { API_USER } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IProductParams, IProductResponse } from './interface';

export const getUser = async (id: number | string) => {
  return axiosInstance.get<unknown, IProductResponse>(`${API_USER}/${id}`);
};

export const getUsers = async (params: IProductParams) => {
  return axiosInstance.get<unknown, IProductResponse>(`${API_USER}`, {
    params: params,
  });
};

export const deleteUser = async (id: string | number) => {
  return axiosInstance.delete<unknown, IProductResponse>(`${API_USER}/${id}`);
};
