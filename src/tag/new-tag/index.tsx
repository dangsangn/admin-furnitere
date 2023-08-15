import { Container } from '@mui/material';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import NewTagHeader from './components/NewCategoryHeader';
import NewTagForm from './components/NewTagForm';
import { useTranslation } from 'react-i18next';

export default function index() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title={t('tag.new.title')}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <NewTagHeader />
        <NewTagForm />
      </Container>
    </Page>
  );
}
