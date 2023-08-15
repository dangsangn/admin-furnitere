import React from 'react';
import { useTranslation } from 'react-i18next';
import HeaderBreadcrumbs from '../../../common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from '../../../common/routes/paths';
import { BREADCUMBS } from '../../../common/constants/common.constants';

const ProductNewHeader = () => {
  const { t } = useTranslation();
  return (
    <>
      <HeaderBreadcrumbs
        heading={t('productMerchant.new.title')}
        links={[
          { name: BREADCUMBS.DASHBOARD, href: PATH_DASHBOARD.root },
          { name: BREADCUMBS.PRODUCT_NEW_VN, href: PATH_DASHBOARD.product.new },
          { name: t('productMerchant.new.new') },
        ]}
      />
    </>
  );
};

export default ProductNewHeader;
