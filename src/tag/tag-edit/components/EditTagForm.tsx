import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, MenuItem, Paper, Stack } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useMessage from '../../../common/hooks/useMessage';
import { INewTag } from '../../common/interface';
import { NewTagSchema } from '../../common/schema';
import { useGetTagById } from '../hooks/useGetTagById';
import { FormProvider, RHFSelect, RHFTextField } from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ITypeTag } from '../../tag-list/constant';

export default function EditTagForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const methods = useForm<INewTag>({
    resolver: yupResolver(NewTagSchema),
    defaultValues: {
      type: ITypeTag.CUSTOMER,
      description: '',
      name: '',
    },
  });
  const { handleSubmit, reset } = methods;

  const { id } = useParams();
  const idTag = parseInt(id as string);

  const { data: dataTagDetail } = useGetTagById(idTag);

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = useUpdateTag({
    onSuccess: () => {
      showSuccessSnackbar(t('tag.edit.successBar'));
      navigate(PATH_DASHBOARD.tag.list);
    },
    onError: () => showErrorSnackbar(t('tag.edit.errorBar')),
  });

  const onSubmit = (data: INewTag) => {
    const newData: INewTag = {
      name: data.name,
      description: data.description,
      type: data.type,
    };

    mutate({ id: idTag, data: newData });
  };

  useEffect(() => {
    if (dataTagDetail) reset(dataTagDetail);
  }, [dataTagDetail]);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Stack spacing={3}>
          <RHFTextField
            name="name"
            label={t('tag.new.name')}
            InputLabelProps={{ shrink: true }}
          />
          <RHFTextField
            name="description"
            label={t('tag.new.desc')}
            InputLabelProps={{ shrink: true }}
          />
          <RHFSelect
            name="type"
            label={t('tag.type')}
            SelectProps={{ native: false }}
            sx={{ width: '50%' }}
          >
            {Object.values(ITypeTag)?.map((tag, index) => (
              <MenuItem value={tag} key={index}>
                {tag}
              </MenuItem>
            ))}
          </RHFSelect>
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
}
