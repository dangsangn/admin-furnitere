import { API_GET_PRODUCT } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IPostProduct } from './interface';

export const postNewProduct = (data: IPostProduct) =>
  axiosInstance.post(API_GET_PRODUCT, data);
