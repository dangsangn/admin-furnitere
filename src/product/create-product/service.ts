import { API_GET_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IPostProduct } from './interface';

export const postNewProduct = (data: IPostProduct) =>
  axiosInstance.post(API_GET_PRODUCT, data);

export const updateProduct = ({
  data,
  id,
}: {
  data: IPostProduct;
  id: string | number;
}) => axiosInstance.put(`${API_GET_PRODUCT}/${id}`, data);

export const getProductById = (id: number | string | null) =>
  axiosInstance.get(`${API_GET_PRODUCT}/${id}`);
