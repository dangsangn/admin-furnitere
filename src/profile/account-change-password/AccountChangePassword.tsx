import AccountChangePasswordForm from './components/AccountChangePasswordForm';
import HeaderBreadcrumbs from 'src/common/components/HeaderBreadcrumbs';
import { PATH_DASHBOARD } from 'src/common/routes/paths';
import i18n from 'src/common/locales/i18n';
export default function AccountChangePassword() {
  return (
    <>
      <HeaderBreadcrumbs
        heading="Đổi tài khoản"
        links={[
          { name: 'Dashboard', href: PATH_DASHBOARD.root },
          { name: 'Tài khoản', href: PATH_DASHBOARD.root },
          { name: i18n.t('change_password') },
        ]}
      />
      <AccountChangePasswordForm />
    </>
  );
}
