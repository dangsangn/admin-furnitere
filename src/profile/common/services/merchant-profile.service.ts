import axiosInstance from 'src/common/utils/axios';
import { IFormMerchantProfile } from '../../../common/@types/profile';

export const editMerchantProfile = (data: IFormMerchantProfile) =>
  axiosInstance.put('/user/update-profile', data);
