import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toQueryString } from 'src/common/constants/common.utils';
import { setAccessToken, setLogin } from '../../auth/login/auth.slice';
import { setIsExpired } from '../../auth/login/login.slice';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';
import { PATH_AUTH } from '../routes/paths';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;
    // store.dispatch(setLogin(false));
    // const refreshToken = store.getState()?.authLogin.refreshToken;
    if (response?.status === 401) {
      // axiosInstance2.post<any, { accessToken: string }>('/merchant/auth/refresh-token', {
      //   refreshToken: refreshToken
      // })
      //   .then((res:any) => {
      //     store.dispatch(setAccessToken('Bearer ' + res?.data?.accessToken));
      //   })
      //   .catch((e)=>{
      //     store.dispatch(setIsExpired(true));
      //     window.location.href = PATH_AUTH.login;
      //   })
    }
    console.log('response:', response);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use(async (config) => {
  const token = store.getState()?.authLogin.accessToken;
  if (token) {
    try {
      config.headers = {
        ...config.headers,
        authorization: 'beare ' + token,
      };
    } catch (e) {
      console.log(e);
    }
  }
  return {
    ...config,
  };
});
export default axiosInstance;
