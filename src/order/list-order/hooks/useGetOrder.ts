import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductParams, IProductResponse, ITransferProduct } from '../interface';
import { getOrder } from '../service';

export function useGetOrder(params: IProductParams) {
  return {
    ...useQuery([QUERY_KEYS.ORDER_LIST, params], () => getOrder(params), {
      select: (data: IProductResponse): ITransferProduct => {
        return {
          items: data?.data?.items,
          meta: data?.data?.meta,
        };
      },
    }),
  };
}
