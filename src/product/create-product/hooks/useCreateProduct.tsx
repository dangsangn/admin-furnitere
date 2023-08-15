import { useMutation, useQueryClient } from 'react-query';
import { IProductCallback } from '../../common/interface.common';
import { postNewProduct } from '../service';
import { QUERY_KEYS } from '../../../common/constants/queryKeys.constant';

export const useCreateProduct = (callback: IProductCallback) => {
  const queryClient = useQueryClient();
  return {
    ...useMutation(postNewProduct, {
      onSuccess: (_result, variables) => {
        queryClient.invalidateQueries([QUERY_KEYS.NEW_PRODUCT]);

        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
