import {Container} from '@mui/material';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import {BREADCUMBS} from 'src/common/constants/common.constants';
import {PATH_DASHBOARD} from 'src/common/routes/paths';
import Page from 'src/common/components/Page';
import useSettings from 'src/common/hooks/useSettings';
import {useTranslation} from 'react-i18next';
import EditForm from 'src/category/edit/components/EditForm';
import vn from "src/common/locales/vn";

const CategoryEditContainer = () => {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();

  return (
    <Page title="Chỉnh sửa tag">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={t('category.edit.title')}
          links={[
            { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
            {
              name: vn.category.list,
              href: PATH_DASHBOARD.category.list,
            },
          ]}
        />
        <EditForm />
      </Container>
    </Page>
  );
};

export default CategoryEditContainer;
