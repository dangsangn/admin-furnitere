import * as Yup from 'yup';
export const ResetPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email('Email must be a valid email address')
    .required('Email is required'),
});
