import { useMutation } from 'react-query';
import { deleteUser } from '../service';

export function useDeleteUser() {
  return {
    ...useMutation(deleteUser),
  };
}
