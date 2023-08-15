import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'src/common/redux/store';
import { PATH_AUTH } from 'src/common/routes/paths';
import { setAccessToken, setLogin } from '../auth.slice';
import { ILoginCallback } from '../interface';
import { getLogout } from '../service';

export const useAuthlogout = (callback: ILoginCallback) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return {
    ...useMutation(getLogout, {
      onSuccess: () => {
        dispatch(setLogin(false));
        dispatch(setAccessToken(''));
        navigate(PATH_AUTH.login, { replace: true });
        callback.onSuccess && callback.onSuccess();
      },
      onError: () => {
        callback.onError && callback.onError();
      },
    }),
  };
};
