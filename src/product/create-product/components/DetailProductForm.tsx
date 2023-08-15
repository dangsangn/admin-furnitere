import { FormHelperText, FormLabel, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import {
  RHFEditor,
  RHFTextField,
  RHFUploadSingleFile,
} from '../../../common/components/hook-form';
import { fData } from '../../../common/utils/formatNumber';

type DetailProps = {
  handleDrop: (acceptedFiles: File[]) => void;
  errors: string | undefined;
};

export default function DetailProductForm({ handleDrop, errors }: DetailProps) {
  const { t } = useTranslation();

  return (
    <Stack direction="column" spacing={3}>
      <Paper elevation={3}>
        <Stack spacing={3} padding={3}>
          <RHFTextField name="name" label={t('productMerchant.new.labelName')} />

          <Stack spacing={1}>
            <FormLabel sx={{ marginLeft: '14px' }}>
              {t('productMerchant.new.description')}
            </FormLabel>
            <RHFEditor name="description" />
          </Stack>

          <Stack spacing={1}>
            <FormLabel sx={{ marginLeft: '14px' }}>
              {t('productMerchant.new.images')}
            </FormLabel>

            <RHFUploadSingleFile
              name="photoUrl"
              maxSize={3145728}
              onDrop={handleDrop}
              accept={{ 'image/*': [] }}
              helperText={
                <Typography
                  variant="caption"
                  sx={{
                    mt: 2,
                    mx: 'auto',
                    display: 'block',
                    textAlign: 'center',
                    color: 'text.secondary',
                  }}
                >
                  {t('productMerchant.new.allow')} *.jpeg, *.jpg, *.png, *.gif
                  <br />
                  {t('productMerchant.new.maxSize')}: {fData(3145728)}
                </Typography>
              }
            />
            {
              <FormHelperText
                sx={{ color: 'red', paddingLeft: '17px', marginTop: '-10px' }}
              >
                {errors}
              </FormHelperText>
            }
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}
