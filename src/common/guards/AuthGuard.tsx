import { ReactNode, useState } from 'react';
import { useLocation } from 'react-router-dom';
// hooks
// pages
// components
import { useSelector } from 'react-redux';
import Login from 'src/auth/login/Login';
import { accessTokenSelector, loginSelector } from 'src/auth/login/auth.slice';

// ----------------------------------------------------------------------

type AuthGuardProps = {
  children: ReactNode;
};

export default function AuthGuard({ children }: AuthGuardProps) {
  const isAuthenticated = useSelector(loginSelector);
  const accessToken = useSelector(accessTokenSelector);
  const { pathname } = useLocation();

  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);
  // useEffect(() => {
  //   const initialize = async () => {
  //     try {
  //       if (accessToken && isValidToken(accessToken)) {
  //         dispatch(setAccessToken(accessToken));
  //         dispatch(setLogin(true));
  //       } else {
  //         dispatch(setLogin(false));
  //       }
  //     } catch (err) {
  //       dispatch(setLogin(false));
  //     }
  //   };

  //   initialize();
  // }, []);

  if (!isAuthenticated) {
    // if (pathname !== requestedLocation) {
    //   setRequestedLocation(pathname);
    // }
    return <Login />;
  }

  // if (requestedLocation && pathname !== requestedLocation) {
  //   setRequestedLocation(null);
  //   return <Navigate to={requestedLocation} />;
  // }

  return <>{children}</>;
}
