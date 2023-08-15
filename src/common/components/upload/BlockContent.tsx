// @mui
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
// assets
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

export default function BlockContent() {
  const { t } = useTranslation();
  return (
    <Stack
      spacing={2}
      alignItems="center"
      justifyContent="center"
      direction={{ xs: 'column', md: 'row' }}
      sx={{ width: 1, textAlign: { xs: 'center', md: 'left' } }}
    >
      <UploadIllustration sx={{ width: 220 }} />

      <Box sx={{ p: 3 }}>
        <Typography gutterBottom variant="h5">
          {t('productMerchant.new.imageLabel')}
        </Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('productMerchant.new.desImageLabel')}&nbsp;
          <Typography
            variant="body2"
            component="span"
            sx={{ color: 'primary.main', textDecoration: 'underline' }}
          >
            {t('productMerchant.new.here')}
          </Typography>
          &nbsp;{t('productMerchant.new.fromMachine')}
        </Typography>
      </Box>
    </Stack>
  );
}
