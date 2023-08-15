import React from 'react';
import useSettings from 'src/common/hooks/useSettings';
import Page from 'src/common/components/Page';
import {Container} from '@mui/material';
import CategoryHeader from 'src/category/list-category/components/CategoryHeader';
import vn from 'src/common/locales/vn';
import CategoryTable from 'src/category/list-category/components/CategoryTable';

const CategoryListContainer = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title={vn.category.title}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <CategoryHeader />
        <CategoryTable />
      </Container>
    </Page>
  );
};

export default CategoryListContainer;
