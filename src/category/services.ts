import axiosInstance from 'src/common/utils/axios';
import {ICategory, ICategoryResponse} from 'src/category/common/interface';
import {API_CATEGORY} from 'src/common/constants/apis';
import {IPageAndLimitParams} from 'src/product/common/interface.common';

const getCategory = async (params: IPageAndLimitParams) => {
  return await axiosInstance.get<any, ICategoryResponse>(API_CATEGORY, { params });
};

const getCategoryById = async (id: number) => {
  return await axiosInstance.get<any, { data: ICategory }>(`${API_CATEGORY}/${id}`);
};

const updateCategory = async (data: ICategory) => {
  return await axiosInstance.put(API_CATEGORY, data);
};
export { getCategory, getCategoryById, updateCategory };
