import axiosInstance from '../../common/utils/axios';
import { IDataUpdatePassword } from './interfaces';

export const editPassword = ({ data }: { data: IDataUpdatePassword }) =>
  axiosInstance.post(`/user/change-password`, data);
