import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../interfaces';
import { editPassword } from '../service';

export const useUpdatePassword = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(editPassword, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.UPDATE_PASSWORD]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
