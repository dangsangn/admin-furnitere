import React from 'react';
import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import ProductHeader from './components/ProductHeader';
import useSettings from '../../common/hooks/useSettings';
import ProductTable from './components/ProductTable';

const ProductListContainer = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Danh Sách sản phẩm'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProductHeader />
        <ProductTable />
      </Container>
    </Page>
  );
};

export default ProductListContainer;
