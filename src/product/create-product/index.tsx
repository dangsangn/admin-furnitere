import React from 'react';
import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import useSettings from '../../common/hooks/useSettings';
import { useTranslation } from 'react-i18next';
import ProductNewHeader from './components/ProductNewHeader';
import ProductNewForm from './components/ProducNewForm';

const CreateProductContainer = () => {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  return (
    <Page title={t('productMerchant.new.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProductNewHeader />
        <ProductNewForm />
      </Container>
    </Page>
  );
};

export default CreateProductContainer;
