import { API_USER } from '../../common/constants/apis';
import axiosInstance from '../../common/utils/axios';
import { IPostUser } from './interface';

export const postNewUser = (data: IPostUser) => axiosInstance.post(API_USER, data);

export const updateUser = ({
  data,
  id,
}: {
  data: Omit<IPostUser, 'password'> & { isActive: boolean };
  id: string | number;
}) => axiosInstance.put(`${API_USER}`, data);

export const getUserById = (id: number | string | null) =>
  axiosInstance.get(`${API_USER}/${id}`);
