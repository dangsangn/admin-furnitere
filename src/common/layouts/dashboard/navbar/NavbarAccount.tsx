import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSelector } from 'react-redux';
import { profileSelector } from '../../../../auth/login/login.slice';
import MyAvatar from '../../../components/MyAvatar';
import { useGetProfile } from '../../../../auth/login/hook/useGetprofile';
import { loginSelector } from '../../../../auth/login/auth.slice';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: theme.palette.grey[500_12],
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
}));

// ----------------------------------------------------------------------

type Props = {
  isCollapse: boolean | undefined;
};

export default function NavbarAccount({ isCollapse }: Props) {
  const profile = useSelector(profileSelector);
  const isLogin = useSelector(loginSelector);
  useGetProfile(isLogin);

  return (
    <Link
      underline="none"
      color="inherit"
      component={RouterLink}
      to={PATH_DASHBOARD.merchant.settings}
    >
      <RootStyle
        sx={{
          ...(isCollapse && {
            bgcolor: 'transparent',
          }),
        }}
      >
        <MyAvatar />

        <Box
          sx={{
            ml: 2,
            transition: (theme) =>
              theme.transitions.create('width', {
                duration: theme.transitions.duration.shorter,
              }),
            ...(isCollapse && {
              ml: 0,
              width: 0,
            }),
            whiteSpace: 'nowrap',
            overFlow: 'hidden',
            textOverflow: 'ellipsis',
            maxWidth: '150px',
          }}
        >
          <Typography variant="subtitle2" noWrap>
            {profile?.name}
          </Typography>
          <Typography variant="body2" noWrap sx={{ color: 'text.secondary' }}>
            {profile?.email}
          </Typography>
        </Box>
      </RootStyle>
    </Link>
  );
}
