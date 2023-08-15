import * as Yup from 'yup';

export const NewTagSchema = Yup.object().shape({
  // description: Yup.string().required('Vui lòng thêm mô tả'),
  name: Yup.string().required('Vui lòng không bỏ trống tên'),
});
