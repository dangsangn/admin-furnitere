import { useMutation } from 'react-query';
import { IRegisterCallback } from '../register.interface';
import { getRegister } from '../register.service';
export const useRegister = (callback: IRegisterCallback) => {
  return {
    ...useMutation(getRegister, {
      onSuccess: () => {
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
