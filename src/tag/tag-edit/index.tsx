import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import HeaderBreadcrumbs from '../../common/components/HeaderBreadcrumbs';
import { useTranslation } from 'react-i18next';
import { BREADCUMBS } from '../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../common/routes/paths';
import EditTagForm from './components/EditTagForm';

export default function EditTag() {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title="Chỉnh sửa tag">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('tag.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            { name: BREADCUMBS.LIST_TAG, href: PATH_DASHBOARD.tag.list },
            { name: BREADCUMBS.EDIT_TAG },
          ]}
        />
        <EditTagForm />
      </Container>
    </Page>
  );
}
