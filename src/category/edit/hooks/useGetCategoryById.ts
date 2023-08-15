import {useQuery} from 'react-query';
import {QUERY_KEYS} from 'src/common/constants/queryKeys.constant';
import {ICategory} from 'src/category/common/interface';
import {getCategoryById} from 'src/category/services';

const useGetCategoryById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.CATEGORY_DETAIL, id], () => getCategoryById(id), {
      select: (data: { data: ICategory }): ICategory => {
        return data.data;
      },
    }),
  };
};

export default useGetCategoryById;
