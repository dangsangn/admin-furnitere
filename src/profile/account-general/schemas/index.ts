import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const UpdateMerchantSchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('fname_require')),
  phone: Yup.string()
    .min(6, i18n.t('pnumber_not_valid'))
    .max(11, i18n.t('pnumber_not_valid'))
    .required(i18n.t('pnumber_require')),
  address: Yup.string().required(i18n.t('address_require')),
});
