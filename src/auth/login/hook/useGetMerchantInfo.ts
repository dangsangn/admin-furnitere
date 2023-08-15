import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getMerchantInfo } from '../service';

export function useGetMerchantInfo(isLoggedin: boolean) {
  return {
    ...useQuery([QUERY_KEYS.MERCHANT_INFO], getMerchantInfo, {
      enabled: isLoggedin,
      staleTime: 5000,
      cacheTime: 0, // cacheTime bằng 0 để đảm bảo kết quả mới nhất sẽ được tải lại từ máy chủ
    }),
  };
}
