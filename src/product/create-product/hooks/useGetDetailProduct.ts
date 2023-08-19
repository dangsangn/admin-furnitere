import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getProductById } from '../service';

export function useGetDetailProduct(id: string | number | null) {
  return {
    ...useQuery([QUERY_KEYS.GET_PRODUCT_BY_ID, id], () => getProductById(id), {
      select: (data: any) => {
        return data?.data;
      },
      enabled: !!id,
    }),
  };
}
