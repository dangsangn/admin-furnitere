import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { INewTag } from './../../common/interface';
import { useMutation, useQueryClient } from 'react-query';
import { ICallback } from '../../common/interface';
import { updateTag } from '../services';

export const useUpdateTag = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(updateTag, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.LIST_TAG]);
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
