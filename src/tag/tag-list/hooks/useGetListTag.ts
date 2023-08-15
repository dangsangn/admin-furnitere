import { getListTag } from './../services';
import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { IParams } from './../interface';
export const useGetListTag = (searchParams: IParams) => {
  return {
    ...useQuery([QUERY_KEYS.LIST_TAG, searchParams], () => getListTag(searchParams)),
  };
};
