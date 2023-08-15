import * as Yup from 'yup';
export const RegisterSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email không đúng định dạng')
    .required('Thông tin của bạn chưa đầy đủ'),
  password: Yup.string()
    .required('Thông tin của bạn chưa đầy đủ')
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=\S+$).{6,25}$/gm,
      'Mật khẩu từ 6-25 ký tự bao gồm cả chữ và số'
    ),
  name: Yup.string()
    .required('Thông tin của bạn chưa đầy đủ')
    .min(10, 'Họ tên từ 10-100 ký tự')
    .max(100, 'Họ tên từ 10-100 ký tự'),
  confirmPassword: Yup.string()
    .required('')
    .oneOf([Yup.ref('password')], ''),
});
