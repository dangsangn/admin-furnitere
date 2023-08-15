import {yupResolver} from '@hookform/resolvers/yup';
import {Button, Paper, Stack} from '@mui/material';
import {useForm} from 'react-hook-form';
import {useTranslation} from 'react-i18next';
import {FormProvider, RHFTextField} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import {useNavigate, useParams} from 'react-router-dom';
import {PATH_DASHBOARD} from '../../../common/routes/paths';
import {ICategory} from 'src/category/common/interface';
import {UpdateCategorySchema} from 'src/category/edit/schema';
import useGetCategoryById from 'src/category/edit/hooks/useGetCategoryById';
import EditIcon from '@mui/icons-material/Edit';
import {LoadingButton} from '@mui/lab';
import {useUpdateCategory} from 'src/category/edit/hooks/useUpdateCategory';
import {useEffect} from 'react';

const EditForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<ICategory>({
    resolver: yupResolver(UpdateCategorySchema),
    defaultValues: {
      id: 0,
      description: '',
      name: '',
    },
  });
  const { handleSubmit, reset } = methods;

  const { id } = useParams();
  const cateId = parseInt(id as string);

  const { data: detail } = useGetCategoryById(cateId);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useUpdateCategory({
    onSuccess: () => {
      showSuccessSnackbar(t('CategoryList.Edit.successBar'));
      navigate(PATH_DASHBOARD.category.list);
    },
    onError: () => showErrorSnackbar(t('CategoryList.Edit.errorBar')),
  });

  const onSubmit = (data: ICategory) => {
    mutate(data);
  };
  useEffect(() => {
    if (detail) reset(detail);
  }, [detail]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack spacing={3} width={'100%'}>
          <RHFTextField name="name" label={t('category.new.name')} />
          <RHFTextField
            name="description"
            label={t('description')}
            multiline
            minRows={5}
          />
        </Stack>
      </Paper>
      <Stack
        direction={'row'}
        spacing={3}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: 3,
          marginRight: 5,
        }}
      >
        <LoadingButton
          loading={isLoading}
          type="submit"
          variant="contained"
          startIcon={<EditIcon />}
        >
          {t('edit')}
        </LoadingButton>
        <Button
          color={'inherit'}
          variant="contained"
          startIcon={<Iconify icon="material-symbols:cancel-outline-rounded" />}
          onClick={() => {
            navigate(PATH_DASHBOARD.tag.list);
          }}
        >
          {t('cancel')}
        </Button>
      </Stack>
    </FormProvider>
  );
};

export default EditForm;
