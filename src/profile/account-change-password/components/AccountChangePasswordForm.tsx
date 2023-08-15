import { useSnackbar } from 'notistack';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Card, IconButton, InputAdornment, Stack } from '@mui/material';

// components
import { useTranslation } from 'react-i18next';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { defaultValues } from '../constants';
import { FormValuesProps, IDataUpdatePassword } from '../interfaces';
import { ChangePassWordSchema } from '../schemas';
// redux
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useMessage from '../../../common/hooks/useMessage';
import { useDispatch, useSelector } from '../../../common/redux/store';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import {
  merchantShowNewSelector,
  merchantShowOldSelector,
  setShowNewPassword,
  setShowOldPassword,
} from '../../common/reducers/merchant-profile.slice';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
// ----------------------------------------------------------------------

export default function AccountChangePasswordForm() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const showOldPassword = useSelector(merchantShowOldSelector);
  const showNewPassword = useSelector(merchantShowNewSelector);
  const { t } = useTranslation();
  const methods = useForm({
    resolver: yupResolver(ChangePassWordSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const navigation = useNavigate();
  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useUpdatePassword({
    onSuccess: () => {
      showSuccessSnackbar(t('successUpdatePass'));
      navigation(PATH_DASHBOARD.merchant.settings);
    },
    onError: () => showErrorSnackbar(t('failUpdatePass')),
  });
  const onSubmit = async (data: FormValuesProps) => {
    const dataUpdate: IDataUpdatePassword = {
      email: 'nv1@gmail.com',
      new_password: data.confirmNewPassword,
    };
    mutate({ data: dataUpdate });
  };

  useEffect(() => {
    return () => {
      dispatch(setShowOldPassword(false));
      dispatch(setShowNewPassword(false));
    };
  }, []);

  return (
    <Card sx={{ p: 3 }}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3} alignItems="flex-end">
          <RHFTextField
            name="oldPassword"
            type={showOldPassword ? 'text' : 'password'}
            label={t('old_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowOldPassword(!showOldPassword))}
                    edge="end"
                  >
                    <Iconify
                      icon={showOldPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            label={t('new_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowNewPassword(!showNewPassword))}
                    edge="end"
                  >
                    <Iconify
                      icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <RHFTextField
            name="confirmNewPassword"
            type={showNewPassword ? 'text' : 'password'}
            label={t('confirm_password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => dispatch(setShowNewPassword(!showNewPassword))}
                    edge="end"
                  >
                    <Iconify
                      icon={showNewPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <LoadingButton type="submit" variant="contained" loading={isLoading}>
            {t('Save')}
          </LoadingButton>
        </Stack>
      </FormProvider>
    </Card>
  );
}
