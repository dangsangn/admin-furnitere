// routes
import Router from './common/routes';
// theme
import ThemeProvider from './common/theme';
// components
import { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import 'src/common/styles/global.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { loginSelector } from './auth/login/auth.slice';
import { policiesSelector } from './auth/login/login.slice';
import NotistackProvider from './common/components/NotistackProvider';
import ScrollToTop from './common/components/ScrollToTop';
import MotionLazyContainer from './common/components/animate/MotionLazyContainer';
import { ChartStyle } from './common/components/chart';
import ThemeSettings from './common/components/settings';
import { AbilityContext } from './common/lib/Can';
import { buildAbilityFor } from './common/lib/ability';
// ----------------------------------------------------------------------
// Rebuild cloud run with env
export default function App() {
  const permissionAbility = useSelector(policiesSelector);
  const isAuthenticated = useSelector(loginSelector);
  const ability = buildAbilityFor(permissionAbility);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth/login');
      return;
    }
    if (pathname === '/') {
      navigate('/dashboard');
    }
  }, [pathname, navigate, isAuthenticated]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <MotionLazyContainer>
      <ThemeProvider>
        <ThemeSettings>
          <QueryClientProvider client={queryClient}>
            <NotistackProvider>
              <AbilityContext.Provider value={ability}>
                <ChartStyle />
                <ScrollToTop />
                <Router />
              </AbilityContext.Provider>
            </NotistackProvider>
          </QueryClientProvider>
        </ThemeSettings>
      </ThemeProvider>
    </MotionLazyContainer>
  );
}
