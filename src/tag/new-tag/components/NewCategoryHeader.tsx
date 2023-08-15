import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { BREADCUMBS } from '../../../common/constants/common.constants';
import { PATH_DASHBOARD } from '../../../common/routes/paths';

export default function NewTagHeader() {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('tag.new.title')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: t('tag.new.title'), href: PATH_DASHBOARD.tag.root },
          { name: t('tag.new.title') },
        ]}
      />
    </>
  );
}
