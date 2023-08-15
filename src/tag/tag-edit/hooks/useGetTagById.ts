import { getTagById } from './../services';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { useQuery } from 'react-query';

export const useGetTagById = (id: number) => {
  return {
    ...useQuery([QUERY_KEYS.TAG_DETAIL, id], () => getTagById(id)),
  };
};
