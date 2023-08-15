import { Button, Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import Iconify from '../../common/components/Iconify';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import { Link as RouterLink } from 'react-router-dom';
import { BREADCUMBS } from '../../common/constants/common.constants';
import TagTable from './components/TagTable';
import ModalConfirmDelete from './components/ModalConfirmDelete';

export default function TagList() {
  const { t } = useTranslation();
  const { themeStretch } = useSettings();
  return (
    <Page title="Danh sách tag">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('tag.list.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.TAGS, href: PATH_DASHBOARD.tag.list },
            { name: t('tag.list.title') },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
              to={PATH_DASHBOARD.tag.new}
              component={RouterLink}
            >
              {t('tag.list.create')}
            </Button>
          }
        />
        <TagTable />
        <ModalConfirmDelete />
      </Container>
    </Page>
  );
}
