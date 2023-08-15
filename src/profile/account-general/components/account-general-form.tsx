import { useSnackbar } from 'notistack';
import { useCallback, useEffect } from 'react';
// form
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Typography, Button } from '@mui/material';
// hooks
// utils
import { fData } from 'src/common/utils/formatNumber';
// components
import {
  FormProvider,
  RHFTextField,
  RHFUploadAvatar,
} from 'src/common/components/hook-form';
import { defaultValues } from '../constants';
import { IFormMerchantProfile } from 'src/common/@types/profile';
import { UpdateMerchantSchema } from '../schemas';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'src/common/redux/store';
import {
  merchantInfoSelector,
  setMerchantInfo,
} from 'src/profile/common/reducers/merchant-profile.slice';
import { formatDate } from 'src/common/constants/common.utils';
import { usePresignImg } from 'src/common/hooks/usePresignImg';
import { mutateEditProfile } from '../hooks/mutateEditProfile';
import {
  IEditMerchantForm,
  ImageInfo,
} from 'src/profile/common/interfaces/merchant-profile.interface';
import { useGetMerchantInfo } from 'src/auth/login/hook/useGetMerchantInfo';
import useDeepEffect from 'src/common/hooks/useDeepEffect';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
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

  const merchantInfo = useSelector(merchantInfoSelector);

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (merchantInfo) {
      reset({
        ...merchantInfo,
        createdAt: formatDate(merchantInfo.createdAt as string),
        photoURL: merchantInfo?.avatar?.url,
      });
    }
  }, [merchantInfo]);

  const { mutate, isSuccess, isLoading } = mutateEditProfile({
    onSuccess: () => {
      enqueueSnackbar(t('update_success'));
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

  const getImageInfo = async (file: File): Promise<ImageInfo> => {
    const imgInfo = await handleUpload(file);
    return imgInfo;
  };
  const onSubmit = async (data: IFormMerchantProfile) => {
    if (typeof data.photoURL !== 'string') {
      const image = await getImageInfo(data?.photoURL as File);
      const dataEdit: IEditMerchantForm = {
        name: data.name,
        address: data.address,
        phoneNumber: data.phoneNumber,
        avatarId: image?.id,
      };
      mutate(dataEdit);
      return;
    }
    const dataEdit: IEditMerchantForm = {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      avatarId: merchantInfo.avatar?.id as number,
    };
    mutate(dataEdit);
  };

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      console.log(file);
      if (file) {
        setValue(
          'photoURL',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <RHFUploadAvatar
              name="photoURL"
              maxSize={3145728}
              onDrop={handleDrop}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  {t('allowed')} *.jpeg, *.jpg, *.png, *.gif
                  <br /> {t('max_size_of')} {fData(3145728)}
                </Typography>
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={2}>
              <RHFTextField disabled name="email" label="Email" />
              <Stack direction={'row'} spacing={1.5}>
                <RHFTextField
                  disabled
                  name="id"
                  label="ID"
                  InputLabelProps={{ shrink: true }}
                />
                <RHFTextField disabled name="createdAt" label={t('registration_date')} />
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <RHFTextField
                  name="name"
                  label={t('name')}
                  InputLabelProps={{ shrink: true }}
                />

                <RHFTextField
                  name="phoneNumber"
                  label={t('phone_number')}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Stack direction="row" spacing={1.5}>
                <RHFTextField disabled name="status" label={t('status')} />
                <RHFTextField disabled name="rank" label={t('rank')} />
              </Stack>
            </Stack>

            <Stack spacing={3} sx={{ mt: 3 }}>
              <RHFTextField
                name="address"
                multiline
                rows={2}
                label={t('address')}
                InputLabelProps={{ shrink: true }}
              />
              <Stack direction={'row'} justifyContent={'space-between'}>
                <Button variant='contained' color='inherit' onClick={() => navigate(PATH_DASHBOARD.merchant.change_password)}>{t('change_password')}</Button>
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
