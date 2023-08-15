import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback } from '../../common/interface';
import { postTag } from '../service';

export const usePostTag = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postTag, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_TAG]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
