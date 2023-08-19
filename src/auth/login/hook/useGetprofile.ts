import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { setProfile } from '../login.slice';
import { getProfileUser } from '../service';

export function useGetProfile(isLoggedin: boolean) {
  const dispatch = useDispatch();
  return {
    ...useQuery([QUERY_KEYS.GET_PROFILE_USER], getProfileUser, {
      enabled: isLoggedin,
      onSuccess: (data) => {
        dispatch(setProfile(data?.data));
      },
    }),
  };
}
