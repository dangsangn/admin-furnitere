import { API_MERCHANT_PASSWORD } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IDataUpdatePassword } from './interfaces';

export const editPassword = ({ data }: { data: IDataUpdatePassword }) =>
  axiosInstance.post(`${API_MERCHANT_PASSWORD}`, data);
