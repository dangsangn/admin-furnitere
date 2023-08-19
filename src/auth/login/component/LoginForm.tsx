// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { IconButton, InputAdornment, Stack } from '@mui/material';
// components
import { useSnackbar } from 'notistack';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useDispatch } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import Iconify from '../../../common/components/Iconify';
import {
  FormProvider,
  RHFCheckbox,
  RHFTextField,
} from '../../../common/components/hook-form';
import { defaultValues } from '../constants';
import { useAuthlogin } from '../hook/useLogin';
import { IFormLoginValuesProps } from '../interface/interface';
import { setEmail, setShowPassword, showPasswordSelector } from '../login.slice';
import { LoginSchema } from '../schema/login.schema';
// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const showPassword = useSelector(showPasswordSelector);
  const dispatch = useDispatch();
  const methods = useForm<IFormLoginValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { enqueueSnackbar } = useSnackbar();
  const onSuccess = () => {
    enqueueSnackbar(t('auth.login.loginSuccess'), {
      variant: 'success',
      autoHideDuration: 1000,
    });
    navigate(PATH_DASHBOARD.root);
  };
  const onError = () => {
    enqueueSnackbar(t('auth.login.loginFailure'), {
      variant: 'error',
    });
  };

  const { mutate } = useAuthlogin({ onSuccess, onError });

  const onSubmit = (data: IFormLoginValuesProps) => {
    dispatch(setEmail(data.email));
    mutate({ email: data.email, password: data.password });
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField name="email" label="Email" />
        <RHFTextField
          name="password"
          label={t('auth.login.labelPassword')}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => dispatch(setShowPassword(!showPassword))}
                  edge="end"
                >
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ my: 2 }}
      >
        <RHFCheckbox name="remember" label={t('auth.login.labelRememberMe')} />
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        sx={{ borderRadius: '60px' }}
      >
        {t('auth.login.btnLogin')}
      </LoadingButton>
    </FormProvider>
  );
}
