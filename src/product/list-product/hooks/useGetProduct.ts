import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getProduct } from '../service';
import { IProductParams, IProductResponse, ITransferProduct } from '../interface';

export function useGetProduct(params: IProductParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_PRODUCT, params], () => getProduct(params), {
      select: (data: IProductResponse): ITransferProduct => {
        return {
          items: data?.data?.items,
          meta: data?.data?.meta,
        };
      },
    }),
  };
}
