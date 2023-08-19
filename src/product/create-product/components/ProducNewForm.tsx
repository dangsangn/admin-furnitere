import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, Paper, Stack } from '@mui/material';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Iconify from '../../../common/components/Iconify';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { useUploadImage } from '../../../common/hooks/useUploadImage';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import axiosInstance from '../../../common/utils/axios';
import { useGetProductCategory } from '../../common/hooks/useGetProductCategory';
import { useGetSupplier } from '../../common/hooks/useGetSupplier';
import { useCreateProduct } from '../hooks/useCreateProduct';
import { useGetDetailProduct } from '../hooks/useGetDetailProduct';
import { IFormNewProduct, IPostProduct } from '../interface';
import { NewProductSchema } from '../schema';
import DetailProductForm from './DetailProductForm';
import RHFSelectSingleValue from './RHFSelectPagination';
import { useUpdateProduct } from '../hooks/useUpdateProduct';

const ProductNewForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');

  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const { data } = useGetDetailProduct(idProduct);

  const methods = useForm<IFormNewProduct>({
    resolver: yupResolver(NewProductSchema),
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
      categoryId: {
        name: '',
        id: 0,
      },
      supplierId: { name: '', id: 0 },
      unit: '',
      qty: 0,
      isActive: true,
      photoUrl: '',
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
      if (idProduct && data) {
        try {
          const category = await axiosInstance.get('category/' + data?.categoryId);
          const supplier = await axiosInstance.get('supplier/' + data?.suplierId);
          reset({
            name: data?.name || '',
            description: data?.description || '',
            price: data?.price || 0,
            imageUrl: data?.imageUrl || '',
            categoryId: {
              name: category.data?.name,
              id: category.data?.id,
            },
            supplierId: { name: supplier.data?.name, id: supplier.data?.id },
            unit: data?.unit || '',
            qty: data?.qty || 0,
            isActive: data?.isActive || true,
            photoUrl: data?.imageUrl || '',
          });
        } catch (error) {}
      }
    })();
  }, [reset, idProduct, data]);

  const { handleUploadImage, setImageUpload } = useUploadImage();

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          'photoUrl',
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
        setImageUpload(file);
      }
    },
    [setValue, setImageUpload]
  );

  const { mutate, error } = useCreateProduct({
    onSuccess: () => {
      showSuccessSnackbar(`Tạo sản phẩm thành công`);
      navigate(PATH_DASHBOARD.product.list);
    },
    onError: () => {
      showErrorSnackbar(`Tạo sản phẩm thất bại, ${error}`);
    },
  });
  const { mutate: mutateUpdate, error: errorUpdate } = useUpdateProduct({
    onSuccess: () => {
      showSuccessSnackbar(`Cập nhật sản phẩm thành công`);
      navigate(PATH_DASHBOARD.product.list);
    },
    onError: () => {
      showErrorSnackbar(`Cập nhật sản phẩm thất bại, ${errorUpdate}`);
    },
  });

  const onSubmit = async (dataSubmit: IFormNewProduct) => {
    const imageUrl = (await handleUploadImage()) || data?.imageUrl;
    const dataTransfer: IPostProduct = {
      categoryId: dataSubmit?.categoryId?.id,
      description: dataSubmit?.description,
      imageUrl: imageUrl as string,
      isActive: true,
      name: dataSubmit?.name,
      price: dataSubmit?.price,
      qty: dataSubmit?.qty,
      supplierId: dataSubmit?.supplierId?.id,
      unit: dataSubmit?.unit,
    };
    if (idProduct) {
      mutateUpdate({ data: dataTransfer, id: idProduct });
      return;
    }
    mutate({ ...dataTransfer });
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

  const listProductCategory =
    dataProductCategory?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.name,
          };
        })
      )
      .flat() || [];
  const listSupplier =
    dataSupplier?.pages
      ?.map((item) =>
        item?.items?.map((itemProd: any) => {
          return {
            id: itemProd.id,
            name: itemProd.name,
          };
        })
      )
      .flat() || [];

  const handleScrollProductCategory = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageProductCategory();
    }
  };
  const handleScrollSupplier = (event: any) => {
    const listBoxNode = event?.currentTarget;
    const position = listBoxNode?.scrollTop + listBoxNode?.clientHeight;
    if (listBoxNode.scrollHeight - position <= 1) {
      fetchNextPageSupplier();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={3}>
        <Stack direction="column" spacing={3} width={'70%'}>
          <DetailProductForm handleDrop={handleDrop} errors={errors?.photoUrl?.message} />
        </Stack>
        <Stack width={'30%'} spacing={3}>
          <Paper elevation={3}>
            <Stack spacing={3} padding={3}>
              {/* <RHFSwitch
                sx={{ marginLeft: '0.5px', width: '100%' }}
                name="isActive"
                label={'Trạng thái sản phẩm'}
              /> */}
              <RHFTextField
                name="price"
                label={'Giá tiền'}
                InputProps={{
                  endAdornment: (
                    <Iconify
                      icon="healthicons:money-bag-outline"
                      sx={{ marginLeft: '3px', fontSize: '25px' }}
                    />
                  ),
                }}
              />
              <RHFTextField
                name="unit"
                label={'Đơn vị'}
                InputProps={{
                  endAdornment: (
                    <Iconify
                      icon="healthicons:money-bag-outline"
                      sx={{ marginLeft: '3px', fontSize: '25px' }}
                    />
                  ),
                }}
              />
              <RHFTextField
                name="qty"
                label={t('variant.new.labelQuantity')}
                InputProps={{
                  endAdornment: (
                    <Iconify
                      icon="healthicons:money-bag-outline"
                      sx={{ marginLeft: '3px', fontSize: '25px' }}
                    />
                  ),
                }}
              />
            </Stack>
          </Paper>
          <Paper elevation={3}>
            <Stack spacing={3} padding={3}>
              <RHFSelectSingleValue
                name="categoryId"
                options={listProductCategory}
                labelProp="name"
                label={'Danh mục sản phẩm'}
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
              <RHFSelectSingleValue
                name="supplierId"
                options={listSupplier}
                labelProp="name"
                label={'Nhà cung cấp sản phẩm'}
                listBoxScroll={handleScrollSupplier}
                loadingScroll={isFetchingNextPageSupplier}
                isLoading={isLoadingSupplier}
                sx={{
                  '& .MuiInputBase-root.Mui-disabled': {
                    '& .MuiOutlinedInput-notchedOutline': {
                      backgroundColor: 'rgba(103, 99, 101, 0.1)',
                    },
                  },
                }}
              />
            </Stack>
          </Paper>
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
          {idProduct ? 'Cập nhật' : t('productMerchant.new.createProduct')}
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
};

export default ProductNewForm;
