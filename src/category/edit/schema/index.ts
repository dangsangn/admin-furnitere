import * as Yup from 'yup';
import i18n from 'src/common/locales/i18n';

export const UpdateCategorySchema = Yup.object().shape({
  name: Yup.string().required(i18n.t('lname_require')),
  description: Yup.string().required(i18n.t('description_required')),
});
