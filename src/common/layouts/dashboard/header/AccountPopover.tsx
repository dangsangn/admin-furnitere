import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
// routes
import { PATH_AUTH } from '../../../routes/paths';
// components
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { setAccessToken, setLogin, setLogout, setRefreshToken } from 'src/auth/login/auth.slice';
import { IMerchantProfileProps } from 'src/common/@types/profile';
import { ACCOUNT_MENU_OPTIONS } from 'src/common/constants/profile.constants';
import useIsMountedRef from 'src/common/hooks/useIsMountedRef';
import { IconButtonAnimate } from '../../../components/animate';
import MenuPopover from '../../../components/MenuPopover';
import MyAvatar from '../../../components/MyAvatar';
import { setMerchantInfo } from 'src/profile/common/reducers/merchant-profile.slice';
// ----------------------------------------------------------------------

export default function AccountPopover({ user }: IMerchantProfileProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const { t } = useTranslation();
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = () => {
    dispatch(setLogin(false));
    dispatch(setAccessToken(''));
    dispatch(setRefreshToken(''));
    
    dispatch(setMerchantInfo({}));
    navigate(PATH_AUTH.login, { replace: true });
    enqueueSnackbar(t('logout_success'), {
      variant: 'success',
      autoHideDuration: 1000,
    });

    if (isMountedRef.current) {
      handleClose();
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {ACCOUNT_MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
            >
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          {t('logout')}
        </MenuItem>
      </MenuPopover>
    </>
  );
}
