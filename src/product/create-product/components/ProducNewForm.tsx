import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { IFormNewProduct, IPostProduct } from '../interface';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { Stack, Paper, Button } from '@mui/material';
import DetailProductForm from './DetailProductForm';
import Iconify from '../../../common/components/Iconify';
import { useTranslation } from 'react-i18next';
import RHFSelectSingleValue from './RHFSelectPagination';
import { LoadingButton } from '@mui/lab';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { useNavigate } from 'react-router-dom';
import { NewProductSchema } from '../schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetProductCategory } from '../../common/hooks/useGetProductCategory';
import { useGetSupplier } from '../../common/hooks/useGetSupplier';
import { useCreateProduct } from '../hooks/useCreateProduct';
import useShowSnackbar from '../../../common/hooks/useMessage';
import { dispatch } from '../../../common/redux/store';
import { useUploadImage } from '../../../common/hooks/useUploadImage';

const ProductNewForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { showErrorSnackbar, showSuccessSnackbar } = useShowSnackbar();
  const methods = useForm<IFormNewProduct>({
    resolver: yupResolver(NewProductSchema),
  });
  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting, errors },
  } = methods;

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
      reset();
    },
  });

  const onSubmit = async (dataSubmit: IFormNewProduct) => {
    const imageUrl = await handleUploadImage();
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
          {t('productMerchant.new.createProduct')}
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
