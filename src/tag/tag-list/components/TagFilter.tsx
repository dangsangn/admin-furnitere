import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../../common/components/hook-form';
import { Stack, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Iconify from '../../../common/components/Iconify';
import RHFSelectPagination from '../../../common/components/hook-form/RHFSelectPagination';
import { ITypeTag, TYPE_TAGS } from '../constant';
import { IFormFilterTag, ITagFilter } from '../interface';
import { useDispatch } from '../../../common/redux/store';
import { setTagFilter } from '../tag.slice';

type Props = {
  onSetPage: (value: number) => void;
};

export default function TagFilter({ onSetPage }: Props) {
  const methods = useForm<IFormFilterTag>({
    defaultValues: { type: null, searchText: '' },
  });
  const { handleSubmit, reset } = methods;
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onSubmit = (data: IFormFilterTag) => {
    const dataFilter: ITagFilter = {
      type: data.type === null ? '' : data.type.id,
    };
    onSetPage(0);
    dispatch(setTagFilter(dataFilter));
  };

  const handleClearCancel = () => {
    reset({ type: null, searchText: '' });
    dispatch(setTagFilter({ type: '' }));
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack p={3} pt={1} pb={5} spacing={3}>
        <Stack direction={'row'} spacing={3}>
          <RHFTextField name="searchText" label={t('tag.list.nameFilter')} size="small" />
          <RHFSelectPagination
            name="type"
            options={TYPE_TAGS}
            labelProp="name"
            label={t('tag.type')}
            size="small"
          />
        </Stack>
        <Stack direction={'row'} spacing={3} flex={1} justifyContent={'flex-end'}>
          <Button
            variant="contained"
            startIcon={<Iconify icon="ic:outline-search" />}
            type="submit"
            size="medium"
          >
            {t('search')}
          </Button>
          <Button
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mdi:delete-circle-outline" />}
            onClick={handleClearCancel}
            size="medium"
          >
            {t('cancel')}
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
