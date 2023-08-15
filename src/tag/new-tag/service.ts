import axiosInstance from '../../common/utils/axios';
import { INewTag } from '../common/interface';
import { API_TAG } from './../../common/constants/apis';

export const postTag = (data: INewTag) => axiosInstance.post(`${API_TAG}`, data);
