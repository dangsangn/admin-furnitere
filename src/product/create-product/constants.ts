import { IFormNewProduct } from './interface';

export const DEFAULT_NEW_PRODUCT: IFormNewProduct = {
  categoryId: {
    name: '',
    id: 0,
  },
  description: '',
  imageUrl: '',
  isActive: true,
  name: '',
  price: 0,
  qty: 0,
  supplierId: {
    name: '',
    id: 0,
  },
  unit: '',
  photoUrl: '',
};
