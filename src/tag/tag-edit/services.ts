import { INewTag, IParamUpdate } from './../common/interface';
import axiosInstance from 'src/common/utils/axios';
import { API_TAG } from '../../common/constants/apis';
import { ITagItem } from '../common/interface';

export const getTagById = (id: number) => {
  return axiosInstance.get<any, ITagItem>(`${API_TAG}/${id}`);
};

export const updateTag = (data: IParamUpdate) => {
  return axiosInstance.patch(`${API_TAG}/${data.id}`, data.data);
};
