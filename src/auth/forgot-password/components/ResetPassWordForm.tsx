import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import { default as useMessage } from 'src/common/hooks/useMessage';
import { axiosInstance2 } from '../../../common/utils/axios';
import { FormValuesProps } from '../../login/interface';
import { useReset } from '../hooks/useReset';
import { ResetPasswordSchema } from '../schema/reset_password.schema';

interface ForgotPassword {
  email: string;
  code: string;
}
export default function ResetPassWordForm() {
  const methods = useForm<ForgotPassword>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '', code: '' },
  });
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { isSubmitting },
    getValues,
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useReset({
    onSuccess: () => {
      showSuccessSnackbar('Success');
    },
    onError: () => {
      showErrorSnackbar('Fail');
    },
  });

  const onSubmit = async (data: FormValuesProps) => {
    try {
      const res = await axiosInstance2.post('/user/forgot-password/verify', data);
      await axiosInstance2.post(
        '/user/forgot-password/get',
        {},
        { headers: { authorization: `beare ${res.data?.data?.jwt}` } }
      );
      navigate('/auth/login');
    } catch (error) {}
  };

  const handleGetOpt = async () => {
    const email = getValues('email');
    try {
      await axiosInstance2.post('/user/forgot-password/send-otp', {
        email,
      });
    } catch (error) {}
  };

  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={3}>
          <RHFTextField
            name="email"
            label="Email address"
            placeholder="demo@minimals.cc"
          />

          <LoadingButton
            fullWidth
            size="large"
            variant="contained"
            onClick={handleGetOpt}
          >
            Gửi yêu cầu
          </LoadingButton>
        </Stack>
        <Stack spacing={3} mt={4}>
          <RHFTextField name="code" label="Nhập mã code được gửi về" />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Xác nhận
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
