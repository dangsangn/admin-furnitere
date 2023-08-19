import React from 'react';
import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import ProductHeader from './components/OrderHeader';
import useSettings from '../../common/hooks/useSettings';
import ProductTable from './components/OrderTable';

const OrderListContainer = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Danh Sách đặt hàng'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProductHeader />
        <ProductTable />
      </Container>
    </Page>
  );
};

export default OrderListContainer;
