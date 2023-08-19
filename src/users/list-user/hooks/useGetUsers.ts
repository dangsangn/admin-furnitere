import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IProductParams, ITransferProduct } from '../interface';
import { getUsers } from '../service';

export function useGetUsers(params: IProductParams) {
  return {
    ...useQuery([QUERY_KEYS.LIST_USER, params], () => getUsers(params), {
      select: (data): ITransferProduct => {
        return {
          items: data?.data?.items,
          meta: data?.data?.meta,
        };
      },
    }),
  };
}
