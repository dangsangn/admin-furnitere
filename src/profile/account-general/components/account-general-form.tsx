import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Button, Card, Grid, Stack } from '@mui/material';
// hooks
// utils
// components
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetMerchantInfo } from 'src/auth/login/hook/useGetMerchantInfo';
import { IFormMerchantProfile } from 'src/common/@types/profile';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { useDispatch, useSelector } from 'src/common/redux/store';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import { setMerchantInfo } from 'src/profile/common/reducers/merchant-profile.slice';
import { profileSelector } from '../../../auth/login/login.slice';
import { defaultValues } from '../constants';
import { useMutateEditProfile } from '../hooks/useMutateEditProfile';
import { UpdateMerchantSchema } from '../schemas';
// ----------------------------------------------------------------------

export default function AccountGeneralForm() {
  const { enqueueSnackbar } = useSnackbar();
  const { t } = useTranslation();
  const { handleUpload } = usePresignImg();
  const dispatch = useDispatch();
  const { useDeepCompareEffect } = useDeepEffect();
  const navigate = useNavigate();
  const methods = useForm<IFormMerchantProfile>({
    resolver: yupResolver(UpdateMerchantSchema),
    defaultValues,
  });

  const profile = useSelector(profileSelector);

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (profile) {
      reset({
        ...profile,
      });
    }
  }, [profile, reset]);

  const { mutate, isSuccess, isLoading } = useMutateEditProfile({
    onSuccess: () => {
      enqueueSnackbar(t('update_success'));
      navigate(PATH_DASHBOARD.root);
    },
    onError: () => {
      enqueueSnackbar(t('update_fail'));
    },
  });

  const { data } = useGetMerchantInfo(isSuccess);
  useDeepCompareEffect(() => {
    if (isSuccess && data) {
      dispatch(setMerchantInfo(data));
      navigate(PATH_DASHBOARD.root);
    }
  }, [data]);

  const onSubmit = async (data: IFormMerchantProfile) => {
    const dataEdit: IFormMerchantProfile = {
      name: data.name,
      address: data.address,
      phone: data.phone,
    };
    mutate(dataEdit);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <RHFTextField name="name" label="Tên" />
              <RHFTextField name="phone" label="Điện thoại" />
              <RHFTextField name="address" label="Địa chỉ" />

              <Stack direction={'row'} justifyContent={'space-between'}>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => navigate(PATH_DASHBOARD.user.changePassword)}
                >
                  {t('change_password')}
                </Button>
                <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  {t('Save')}
                </LoadingButton>
              </Stack>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
