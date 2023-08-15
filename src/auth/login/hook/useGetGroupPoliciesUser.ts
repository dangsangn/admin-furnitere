import { useQuery } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { getPolicesUser } from '../service';

export function useGetGroupPolicesUser() {
  return {
    ...useQuery([QUERY_KEYS.GROUP_POLICIES_CURRENT], () => getPolicesUser(), {}),
  };
}
