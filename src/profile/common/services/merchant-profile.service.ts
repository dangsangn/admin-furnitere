import { API_MERCHANT_PROFILE } from 'src/common/constants/apis';
import axiosInstance from 'src/common/utils/axios';
import { IEditMerchantForm } from '../interfaces/merchant-profile.interface';

export const editMerchantProfile = (data: IEditMerchantForm) =>
  axiosInstance.put(API_MERCHANT_PROFILE, data);
