import axios from 'axios';
import { toQueryString } from 'src/common/constants/common.utils';
import { setLogin } from '../../auth/login/auth.slice';
// config
import { HOST_API } from '../../config';
import { store } from '../redux/store';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});

export const axiosInstance2 = axios.create({
  baseURL: HOST_API,
  paramsSerializer: (param) => toQueryString(param),
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const { response } = error;

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
    if (response?.data?.message === 'Invalid token') {
      store.dispatch(setLogin(false));
    }
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
