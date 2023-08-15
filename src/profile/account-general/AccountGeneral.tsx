import AccountGeneralForm from './components/account-general-form';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import i18n from 'src/common/locales/i18n';
import Page from '../../common/components/Page';

export default function AccountGeneral() {
  return (
    <>
      <Page title={i18n.t('account')}>
        <HeaderBreadcrumbs
          heading={i18n.t('account')}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Merchant', href: PATH_DASHBOARD.merchant.root },
            { name: i18n.t('account_settings') },
          ]}
        />
        <AccountGeneralForm />
      </Page>
    </>
  );
}
