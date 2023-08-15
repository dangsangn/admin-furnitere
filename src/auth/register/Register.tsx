import {
  Box,
  Card,
  Checkbox,
  Container,
  FormLabel,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'src/common/components/Image';
import Page from 'src/common/components/Page';
import useResponsive from 'src/common/hooks/useResponsive';
import LogoOnlyLayout from 'src/common/layouts/LogoOnlyLayout';
import RegisterForm from './components/RegisterForm';
import { LINK_SWITCH } from './register.constants';
import { useDispatch } from '../../common/redux/store';
import { setAcceptedPolicy } from './register.slice';

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
  padding: theme.spacing(0),
}));

export default function Register() {
  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();

  return (
    <Page title="Register New Merchat">
      <RootStyle>
        {mdUp && (
          <SectionStyle>
            <Box
              sx={{
                background: 'url(/images/login-background.svg)',
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
                ></Typography>
                <Typography
                  fontSize={'26px'}
                  lineHeight={'40px'}
                  fontFamily={'Plus Jakarta Sans'}
                  fontWeight={700}
                  color="primary"
                ></Typography>
              </Box>
            </Box>
            <Box
              sx={{
                background: 'url(/images/login-subtract.svg)',
                width: '50%',
                height: '50%',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'contain',
                position: 'fixed',
                bottom: 0,
                left: 0,
              }}
            />
          </SectionStyle>
        )}
        {/* <LogoOnlyLayout /> */}
        <Container
          maxWidth="sm"
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <ContentStyle>
            <Box sx={{ textAlign: 'center' }}>
              <Stack
                sx={{
                  flexGrow: 1,
                  justifyItems: 'space-between',
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{ flexGrow: 1, justifyItems: 'space-between' }}
                >
                  <Typography variant="h4">Chào mừng đến</Typography>
                  <Typography variant="h4" gutterBottom color="primary"></Typography>
                </Stack>
                <Typography
                  variant="h4"
                  color="primary"
                  alignSelf={'flex-start'}
                ></Typography>
              </Stack>
              <RegisterForm />

              <Typography sx={{ marginTop: '20px' }}>
                Bạn đã có tài khoản?{' '}
                <Link href={LINK_SWITCH.login_link} underline="hover">
                  Đăng nhập
                </Link>
              </Typography>
              <Card
                sx={{
                  minWidth: 275,
                  mt: 2,
                  borderRadius: '12px',
                  border: '1px solid rgba(115, 123, 123, 1)',
                  py: 1,
                  px: 2,
                }}
              >
                <Stack alignItems={'flex-start'}>
                  <Typography
                    fontSize="12px"
                    fontWeight={400}
                    color={'rgba(115, 123, 123, 1)'}
                    fontFamily={'Plus Jakarta Sans'}
                  >
                    Mật khẩu bao gồm:
                  </Typography>
                  <Stack ml={1} direction={'row'} spacing={1} alignItems={'center'}>
                    <Box
                      sx={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(115, 123, 123, 1)',
                      }}
                    />
                    <Typography
                      fontSize="12px"
                      fontWeight={400}
                      color={'rgba(115, 123, 123, 1)'}
                      fontFamily={'Plus Jakarta Sans'}
                    >
                      Cả ký tự chữ và số
                    </Typography>
                  </Stack>
                  <Stack ml={1} direction={'row'} spacing={1} alignItems={'center'}>
                    <Box
                      sx={{
                        width: '4px',
                        height: '4px',
                        borderRadius: '50%',
                        backgroundColor: 'rgba(115, 123, 123, 1)',
                      }}
                    />
                    <Typography
                      fontSize="12px"
                      fontWeight={400}
                      color={'rgba(115, 123, 123, 1)'}
                      fontFamily={'Plus Jakarta Sans'}
                    >
                      Có 6-25 ký tự
                    </Typography>
                  </Stack>
                </Stack>
              </Card>
            </Box>
          </ContentStyle>
        </Container>
      </RootStyle>
    </Page>
  );
}
