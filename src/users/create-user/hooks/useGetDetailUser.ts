import { useQuery } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { getUserById } from '../service';

export function useGetDetailUser(id: string | number | null) {
  return {
    ...useQuery([QUERY_KEYS.USER_BY_ID, id], () => getUserById(id), {
      select: (data: any) => {
        return data?.data;
      },
      enabled: !!id,
    }),
  };
}
