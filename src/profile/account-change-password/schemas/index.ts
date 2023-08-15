import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';
export const ChangePassWordSchema = Yup.object().shape({
  oldPassword: Yup.string().required(i18n.t('old_password_required')),
  newPassword: Yup.string()
    .min(6, i18n.t('password_min_6'))
    .required(i18n.t('new_password_require')),
  confirmNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    i18n.t('password_must_match')
  ),
});
