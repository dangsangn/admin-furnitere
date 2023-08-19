import { useInfiniteQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getSupplier } from '../service';
import { IPageAndLimitParams } from '../../common/interface.common';

export const useGetSupplier = (params: IPageAndLimitParams) => {
  const {
    data: dataSupplier,
    isLoading: isLoadingSupplier,
    fetchNextPage: fetchNextPageSupplier,
    isFetchingNextPage: isFetchingNextPageSupplier,
  } = useInfiniteQuery(
    [QUERY_KEYS.SUPPLIER, params],
    ({ pageParam }) => getSupplier({ ...params, page: pageParam }),
    {
      getNextPageParam: (lastPage: any) => {
        const { meta } = lastPage;
        const { currentPage, totalPages } = meta;
        return currentPage < totalPages ? currentPage + 1 : undefined;
      },
      cacheTime: 60000,
    }
  );

  return {
    dataSupplier,
    isLoadingSupplier,
    fetchNextPageSupplier,
    isFetchingNextPageSupplier,
  };
};
