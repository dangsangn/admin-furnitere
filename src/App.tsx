// routes
import Router from './common/routes';
// theme
import ThemeProvider from './common/theme';
// components
import ScrollToTop from './common/components/ScrollToTop';
import NotistackProvider from './common/components/NotistackProvider';
import MotionLazyContainer from './common/components/animate/MotionLazyContainer';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { policiesSelector } from './auth/login/login.slice';
import { buildAbilityFor } from './common/lib/ability';
import { AbilityContext } from './common/lib/Can';
import ThemeSettings from './common/components/settings';
import { ChartStyle } from './common/components/chart';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'src/common/styles/global.css';
// ----------------------------------------------------------------------
// Rebuild cloud run with env
export default function App() {
  const permissionAbility = useSelector(policiesSelector);
  const ability = buildAbilityFor(permissionAbility);

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
