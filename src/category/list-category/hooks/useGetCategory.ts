import {useQuery} from 'react-query';
import {QUERY_KEYS} from 'src/common/constants/queryKeys.constant';
import {IPageAndLimitParams} from 'src/product/common/interface.common';
import {getCategory} from 'src/category/services';
import {ICategoryResponse, ITransferCategory} from 'src/category/common/interface';

const useGetCategory = (params: IPageAndLimitParams) => {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_LIST, params], () => getCategory(params), {
      select: (data: ICategoryResponse): ITransferCategory => {
        return {
          items: data?.data?.items,
          meta: data?.data?.meta,
        };
      },
    }),
  };
};

export default useGetCategory;
