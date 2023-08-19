import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useGetProductCategory } from '../../common/hooks/useGetProductCategory';
import { useGetSupplier } from '../../common/hooks/useGetSupplier';
import { useCreateUser } from '../hooks/useCreateUser';
import { useGetDetailUser } from '../hooks/useGetDetailUser';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { IFormNewUser } from '../interface';
import { NewUserSchema } from '../schema';
import RHFSelectSingleValue from './RHFSelectPagination';

const ProductNewForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); //git remote add origin git@github.com:dangsangn/admin-furnitere.git
  const idUser = searchParams.get('id');

  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const { data } = useGetDetailUser(idUser);
  console.log('data:', data);

  const methods = useForm<IFormNewUser>({
    resolver: yupResolver(NewUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      roleId: { name: 'Nhân viên', id: 2 },
      password: '',
    },
  });
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

  useEffect(() => {
    (async () => {
      if (idUser && data) {
        try {
          reset({
            name: data?.name || '',
            email: data?.email || '',
            phone: data?.phone || '',
            address: data?.address || '',
            roleId:
              data.roleId === 1
                ? {
                    name: 'Admin',
                    id: 1,
                  }
                : {
                    name: 'Nhân viên',
                    id: 2,
                  },
            isActive: !data?.isActive
              ? { id: 1, name: 'Ẩn' }
              : {
                  id: 2,
                  name: 'Kích hoạt',
                },
          });
        } catch (error) {}
      }
    })();
  }, [reset, idUser, data]);

  const { mutate, error } = useCreateUser({
    onSuccess: () => {
      showSuccessSnackbar(`Tạo Nhân viên thành công`);
      navigate(PATH_DASHBOARD.user.list);
    },
    onError: () => {
      showErrorSnackbar(`Tạo Nhân viên thất bại, ${error}`);
    },
  });
  const { mutate: mutateUpdate, error: errorUpdate } = useUpdateUser({
    onSuccess: () => {
      showSuccessSnackbar(`Cập nhật Nhân viên thành công`);
      navigate(PATH_DASHBOARD.user.list);
    },
    onError: () => {
      showErrorSnackbar(`Cập nhật Nhân viên thất bại, ${errorUpdate}`);
    },
  });

  const onSubmit = async (dataSubmit: IFormNewUser) => {
    console.log('dataSubmit:', dataSubmit);
    const formData = {
      ...dataSubmit,
      roleId: dataSubmit.roleId.id,
      isActive: dataSubmit.isActive.id === 1 ? false : true,
    };
    if (idUser) {
      const { password, ...updateData } = formData;
      mutateUpdate({ data: updateData, id: idUser });
      return;
    }
    const { isActive, ...addData } = formData;
    mutate(addData);
  };

  const {
    dataProductCategory,
    fetchNextPageProductCategory,
    isFetchingNextPageProductCategory,
    isLoadingProductCategory,
  } = useGetProductCategory({ page: 1, limit: 15 });

  const {
    dataSupplier,
    fetchNextPageSupplier,
    isFetchingNextPageSupplier,
    isLoadingSupplier,
  } = useGetSupplier({ page: 1, limit: 15 });

  const handleScrollProductCategory = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductCategory();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={3} width={'50%'}>
          <RHFTextField name="name" label={'Tên nhân viên'} />
          <RHFTextField name="email" label={'Email'} />
          {!idUser && <RHFTextField type="password" name="password" label={'Mật khẩu'} />}
          {idUser && (
            <RHFSelectSingleValue
              name="isActive"
              options={[
                { id: 1, name: 'Ẩn' },
                { id: 2, name: 'Kích hoạt' },
              ]}
              labelProp="name"
              label={'Trạng thái'}
              listBoxScroll={handleScrollProductCategory}
              loadingScroll={isFetchingNextPageProductCategory}
              isLoading={isLoadingProductCategory}
              sx={{
                '& .MuiInputBase-root.Mui-disabled': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    backgroundColor: 'rgba(103, 99, 101, 0.1)',
                  },
                },
              }}
            />
          )}
        </Stack>
        <Stack width={'50%'} spacing={3}>
          <RHFTextField name="phone" label={'SĐT'} />
          <RHFTextField name="address" label={'Địa chỉ'} />
          <RHFSelectSingleValue
            name="roleId"
            options={[
              { id: 1, name: 'Admin' },
              { id: 2, name: 'Nhân viên' },
            ]}
            labelProp="name"
            label={'Chắc năng'}
            listBoxScroll={handleScrollProductCategory}
            loadingScroll={isFetchingNextPageProductCategory}
            isLoading={isLoadingProductCategory}
            sx={{
              '& .MuiInputBase-root.Mui-disabled': {
                '& .MuiOutlinedInput-notchedOutline': {
                  backgroundColor: 'rgba(103, 99, 101, 0.1)',
                },
              },
            }}
          />
        </Stack>
      </Stack>
      <Stack
        direction={'row'}
        width={'100%'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        spacing={3}
        mt={3}
      >
        <LoadingButton
          variant="contained"
          size="large"
          type="submit"
          loading={isSubmitting}
        >
          {idUser ? 'Cập nhật' : 'Tạo mới'}
        </LoadingButton>
        <Button
          color="inherit"
          variant="contained"
          size="large"
          onClick={() => navigate(PATH_DASHBOARD.product.list)}
        >
          {t('productMerchant.new.cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
};;

export default ProductNewForm;
