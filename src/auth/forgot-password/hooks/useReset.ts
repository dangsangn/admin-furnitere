import { useMutation } from 'react-query';
import { IResetCallBack } from '../interface';
import { forgotPassword } from '../services';
export const useReset = (callback: IResetCallBack) => {
  return {
    ...useMutation(forgotPassword, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
