import { Container } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import Page from '../../common/components/Page';
import useSettings from '../../common/hooks/useSettings';
import ProductNewForm from './components/ProducNewForm';
import ProductNewHeader from './components/ProductNewHeader';

const CreateProductContainer = () => {
  const { themeStretch } = useSettings();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');

  return (
    <Page title={idProduct ? 'Cập nhật sản phẩm' : t('productMerchant.new.title')}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <ProductNewHeader />
        <ProductNewForm />
      </Container>
    </Page>
  );
};

export default CreateProductContainer;
