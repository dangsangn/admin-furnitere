import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import UserNewForm from './components/UserNewForm';
import UserNewHeader from './components/UserNewHeader';

const CreateUserContainer = () => {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');

  return (
    <Page title={idProduct ? 'Cập nhật Nhân viên' : 'Thêm nhân viên'}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <UserNewHeader />
        <UserNewForm />
      </Container>
    </Page>
  );
};

export default CreateUserContainer;
