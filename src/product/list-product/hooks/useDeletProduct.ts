import { useMutation } from 'react-query';
import { deleteProduct } from '../service';

export function useDeleteProduct() {
  return {
    ...useMutation(deleteProduct),
  };
}
