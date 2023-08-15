import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { IFormCallback } from 'src/profile/common/interfaces/merchant-profile.interface';
import { editMerchantProfile } from 'src/profile/common/services/merchant-profile.service';

export const mutateEditProfile = (callback: IFormCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editMerchantProfile, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.MERCHANT_INFO]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
