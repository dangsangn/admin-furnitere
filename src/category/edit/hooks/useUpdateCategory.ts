import { ICallback } from 'src/tag/common/interface';
import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from 'src/common/constants/queryKeys.constant';
import { updateCategory } from 'src/category/services';

export const useUpdateCategory = (callback: ICallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(updateCategory, {
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
