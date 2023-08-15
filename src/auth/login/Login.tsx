// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Container, Typography } from '@mui/material';
import useAuth from 'src/common/hooks/useAuth';
import Page from 'src/common/components/Page';
import LoginForm from './component/LoginForm';
import useResponsive from 'src/common/hooks/useResponsive';
import { useSelector } from 'react-redux';
import { isExpiredSelector, setIsExpired } from './login.slice';
import { useEffect } from 'react';
import { default as useMessage } from 'src/common/hooks/useMessage';
import vn from '../../common/locales/vn';
import { dispatch } from '../../common/redux/store';
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '646px',
  display: 'flex',
  // flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(0, 0, 2),
  padding: '0!important',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
  position: 'relative',
}));

export default function Login() {
  const { method } = useAuth();

  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const expired = useSelector(isExpiredSelector);
  useEffect(() => {
    if (expired) {
      showErrorSnackbar(vn.expired);
      dispatch(setIsExpired(false));
    }
  }, [expired]);

  return (
    <Page title="Login">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Box
              sx={{
                background:
                  'url(https://plus.unsplash.com/premium_photo-1672819551308-4b2c2e8a9d23?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1083&q=80)',
                width: '100%',
                height: '100%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Box ml={'8%'}>
                <Typography
                  fontSize={'40px'}
                  lineHeight={'40px'}
                  fontFamily={'Plus Jakarta Sans'}
                  fontWeight={700}
                >
                  Chào mừng đến với
                </Typography>
                <Typography
                  fontSize={'40px'}
                  lineHeight={'40px'}
                  fontFamily={'Plus Jakarta Sans'}
                  fontWeight={700}
                  color="primary"
                >
                  Trang quản lý
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                // background: 'url(/images/login-subtract.svg)',
                width: '50%',
                height: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                position: 'absolute',
                bottom: 0,
                left: 0,
              }}
            />
          </SectionStyle>
        )}
        <Container maxWidth="sm">
          <ContentStyle>
            <Stack
              direction="row"
              display="flex"
              alignItems="center"
              sx={{
                mb: 5,
              }}
            >
              <Stack sx={{ flexGrow: 1, justifyItems: 'space-between' }}>
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexGrow: 1, justifyItems: 'space-between' }}
                >
                  <Typography variant="h4">Chào mừng đến</Typography>
                  <Typography variant="h4" gutterBottom color="primary">
                    với trang quản lý{' '}
                  </Typography>
                </Stack>
                <Typography variant="h4" color="primary"></Typography>
              </Stack>
            </Stack>
            <LoginForm />
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
