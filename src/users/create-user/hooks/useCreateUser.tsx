import { useMutation, useQueryClient } from 'react-query';
import { IProductCallback } from '../../common/interface.common';
import { postNewUser } from '../service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useCreateUser = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postNewUser, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_USER]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
