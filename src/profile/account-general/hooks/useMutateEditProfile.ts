import { dispatch } from 'src/common/redux/store';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IFormCallback } from 'src/profile/common/interfaces/merchant-profile.interface';
import { editMerchantProfile } from 'src/profile/common/services/merchant-profile.service';
import { useDispatch } from 'react-redux';
import { profileSelector, setProfile } from '../../../auth/login/login.slice';
import { useSelector } from 'react-redux';

export const useMutateEditProfile = (callback: IFormCallback) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const profile = useSelector(profileSelector);
  return {
    ...useMutation(editMerchantProfile, {
      onSuccess: ({ data }, variables) => {
        dispatch(
          setProfile({
            ...profile,
            name: data?.name,
            phone: data?.phone,
            address: data?.address,
          })
        );
        queryClient.invalidateQueries([QUERY_KEYS.GET_PROFILE_USER]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
