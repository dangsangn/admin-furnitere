import { useMutation } from 'react-query';
import { dispatch } from 'src/common/redux/store';
import { setAccessToken, setLogin, setRefreshToken } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getAuth } from '../service';

export const useAuthlogin = ({ onError, onSuccess }: ILoginCallback) => {
  return {
    ...useMutation(getAuth, {
      onSuccess: (data) => {
        if (!data) return;
        console.log(data);
        dispatch(setAccessToken('Bearer ' + data?.data?.jwt));
        dispatch(setRefreshToken(''));
        dispatch(setLogin(true));
        onSuccess();
      },
      onError,
    }),
  };
};
