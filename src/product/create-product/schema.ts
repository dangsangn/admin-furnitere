import * as Yup from 'yup';
const MAX_DESCRIPTION_LENGTH = 100000;

export const NewProductSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng không để trống tên sản phẩm'),
  description: Yup.string()
    .required('Vui lòng không để trống mô tả')
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Mô tả không được vượt quá ${MAX_DESCRIPTION_LENGTH} ký tự`
    ),
  categoryId: Yup.object().shape({
    name: Yup.string().required('Danh mục sản phẩm không được trống'),
    id: Yup.number().required('Danh mục sản phẩm không được trống'),
  }),
  supplierId: Yup.object().shape({
    name: Yup.string().required('Nhà cung cấp sản phẩm không được trống'),
    id: Yup.number().required('Nhà cung cấp sản phẩm không được trống'),
  }),
  photoUrl: Yup.mixed().required('Vui lòng tải ảnh lên'),
  unit: Yup.string().required('Vui lòng không để trống đơn vị'),
  price: Yup.number()
    .typeError('Giá phải là số!')
    .required('Vui lòng không để trống giá tiền'),
  qty: Yup.number()
    .required('Vui lòng không để trống số lượng')
    .min(0, 'Số lượng phải lớn hơn 0'),
});
