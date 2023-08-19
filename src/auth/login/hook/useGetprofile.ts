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
      staleTime: 5000,
      cacheTime: 0, // cacheTime bằng 0 để đảm bảo kết quả mới nhất sẽ được tải lại từ máy chủ
      onSuccess: (data) => {
        dispatch(setProfile(data?.data));
      },
    }),
  };
}
