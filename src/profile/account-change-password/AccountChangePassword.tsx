import AccountChangePasswordForm from './components/AccountChangePasswordForm';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import i18n from 'src/common/locales/i18n';
export default function AccountChangePassword() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Merchant', href: PATH_DASHBOARD.merchant.root },
          { name: i18n.t('change_password') },
        ]}
      />
      <AccountChangePasswordForm />
    </>
  );
}
