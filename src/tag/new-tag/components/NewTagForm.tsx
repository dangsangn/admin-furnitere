import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Button, MenuItem, Paper, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  FormProvider,
  RHFSelect,
  RHFTextField,
} from '../../../common/components/hook-form';
import Iconify from '../../../common/components/Iconify';
import useMessage from '../../../common/hooks/useMessage';
import { usePostTag } from '../hooks/usePostTag';
import { NewTagSchema } from '../../common/schema';
import { INewTag } from '../../common/interface';
import { useNavigate } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { ITypeTag } from '../../tag-list/constant';

export default function NewTagForm() {
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
  const { handleSubmit } = methods;

  const { showSuccessSnackbar, showErrorSnackbar } = useMessage();

  const { mutate, isLoading } = usePostTag({
    onSuccess: () => {
      showSuccessSnackbar(t('tag.new.successBar'));
      navigate(PATH_DASHBOARD.tag.list);
    },
    onError: () => showErrorSnackbar(t('tag.new.errorBar')),
  });
  const onSubmit = (data: INewTag) => {
    const newData: INewTag = {
      name: data.name,
      description: data.description,
      type: data.type,
    };
    mutate(newData);
  };
  return (
    <>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={3} sx={{ padding: 3 }}>
          <Stack spacing={3} width={'100%'}>
            <RHFTextField name="name" label={t('tag.new.name')} />
            <RHFTextField name="description" label={t('tag.new.desc')} />
            <RHFSelect name="type" label={t('tag.type')} SelectProps={{ native: false }}>
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
            startIcon={<Iconify icon="material-symbols:add-circle-outline-rounded" />}
          >
            {t('create')}
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
    </>
  );
}
