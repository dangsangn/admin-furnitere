import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getOrderStatusList } from '../service';

export function useGetOrderStatus() {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT], () => getOrderStatusList(), {
      select: (data) => {
        return data?.data?.items;
      },
    }),
  };
}
