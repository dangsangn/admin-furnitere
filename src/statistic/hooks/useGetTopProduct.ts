import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../common/constants/queryKeys.constant';
import axiosInstance from '../../common/utils/axios';

export const getTopProduct = () => {
  return axiosInstance.get('/statistic/top');
};

export function useGetTopProduct({ onSuccess }: any) {
  return {
    ...useQuery([QUERY_KEYS.GET_TOP_PRODUCT], () => getTopProduct(), {
      select: (data) => data?.data,
      onSuccess,
    }),
  };
}
