import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import {
  Container,
  IconButton,
  InputAdornment,
  Stack,
  Typography,
  Checkbox,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { FormProvider, RHFTextField } from 'src/common/components/hook-form';
import Iconify from 'src/common/components/Iconify';
import useMessage from 'src/common/hooks/useMessage';
import en from 'src/common/locales/en';
import { dispatch } from 'src/common/redux/store';
import { useRegister } from '../hooks/useRegister';
import { defaultValuesRegister } from '../register.constants';
import { IDataSubmitRegister, IFormRegister } from '../register.interface';
import {
  acceptedPolicySelector,
  setAcceptedPolicy,
  setEmail,
  setShowPassword,
  showConfirmPasswordSelector,
  showPasswordSelector,
  setShowConfirmPassword,
} from '../register.slice';
import { RegisterSchema } from '../schema/register.schema';
import { useNavigate } from 'react-router-dom';
import { PATH_AUTH } from '../../../common/routes/paths';

export default function RegisterForm() {
  const showPassword = useSelector(showPasswordSelector);
  const showConfirmPassword = useSelector(showConfirmPasswordSelector);
  const acceptedPolicy = useSelector(acceptedPolicySelector);
  const methods = useForm<IFormRegister>({
    resolver: yupResolver(RegisterSchema),
    defaultValues: defaultValuesRegister,
  });
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();
  const { mutate } = useRegister({
    onSuccess: () => {
      showSuccessSnackbar(en.showSuccessRegister);
    },
    onError: () => {
      showErrorSnackbar(en.showFailRegister);
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAcceptedPolicy(event.target.checked));
  };

  const onSubmit = (data: IFormRegister) => {
    const newDataRegister: IDataSubmitRegister = {
      email: data.email,
      password: data.password,
      name: data.name,
    };
    dispatch(setEmail(data.email));
    mutate(newDataRegister, {
      onSuccess: () => {
        navigate(PATH_AUTH.emailConfirmation);
      },
    });
  };

  return (
    <>
      <Container maxWidth="sm" sx={{ px: '0 !important' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} mt={2}>
            <RHFTextField size="small" name="name" label="Họ và tên" />
            <RHFTextField size="small" name="email" label="Email" />
            <RHFTextField
              size="small"
              name="password"
              label="Mật khẩu"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => dispatch(setShowPassword(!showPassword))}
                      edge="end"
                    >
                      <Iconify
                        icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <RHFTextField
              size="small"
              name="confirmPassword"
              label="Xác nhận Mật khẩu"
              type={showConfirmPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        dispatch(setShowConfirmPassword(!showConfirmPassword))
                      }
                      edge="end"
                    >
                      <Iconify
                        icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Typography
              mt={3}
              sx={{ color: '#637381', fontSize: '13px', alignSelf: 'flex-start' }}
            >
              <Checkbox defaultChecked={false} onChange={handleChange} size="small" /> Tôi
              đã đọc và đồng ý với các điều khoản chính sách của TESO
            </Typography>
            <LoadingButton
              loading={isSubmitting}
              type="submit"
              fullWidth={true}
              variant="contained"
              size="large"
              disabled={!acceptedPolicy}
              sx={{ borderRadius: '60px' }}
            >
              Đăng ký
            </LoadingButton>
          </Stack>
        </FormProvider>
      </Container>
    </>
  );
}
