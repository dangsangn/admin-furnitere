import React from 'react';
import Page from '../../common/components/Page';
import { Container } from '@mui/material';
import UserHeader from './components/UserHeader';
import useSettings from '../../common/hooks/useSettings';
import UserTable from './components/UserTable';

const UserListContainer = () => {
  const { themeStretch } = useSettings();
  return (
    <Page title={'Danh Sách Nhân Viên'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <UserHeader />
        <UserTable />
      </Container>
    </Page>
  );
};

export default UserListContainer;
