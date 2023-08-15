import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import {
  default as useMessage,
  default as useShowSnackbar,
} from 'src/common/hooks/useMessage';
import { FormValuesProps } from '../../login/interface';
import { useReset } from '../hooks/useReset';
import { ResetPasswordSchema } from '../schema/reset_password.schema';

export default function ResetPassWordForm() {
  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(ResetPasswordSchema),
    defaultValues: { email: '' },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
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

  const onSubmit = (data: FormValuesProps) => {
    const newData = {
      email: data.email,
    };
    mutate(newData);
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
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Send Request
          </LoadingButton>
        </Stack>
      </FormProvider>
    </>
  );
}
