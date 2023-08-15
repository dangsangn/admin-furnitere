import { useMutation, useQueryClient } from 'react-query';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';
import { ICallback, IDataTagDelete } from '../interface';
import { deleteMultiTag } from '../services';

export function useDeleteMultiTag(callback: ICallback) {
  const queryClient = useQueryClient();

  return useMutation((data: IDataTagDelete) => deleteMultiTag(data), {
    onSuccess() {
      queryClient
        .getQueryCache()
        .findAll([QUERY_KEYS.LIST_TAG])
        .forEach(({ queryKey }) => {
          queryClient.invalidateQueries(queryKey);
        });
      callback.onSuccess && callback.onSuccess();
    },

    onError() {
      callback.onError && callback.onError();
    },
  });
}
