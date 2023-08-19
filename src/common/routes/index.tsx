import { ElementType, lazy, Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// hooks
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import AuthGuard from '../guards/AuthGuard';
import GuestGuard from '../guards/GuestGuard';
// config
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_DASHBOARD } from './paths';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) => {
  // const { pathname } = useLocation();

  // const { isAuthenticated } = useAuth();

  const isDashboard = true; //pathname.includes('/dashboard') && isAuthenticated;

  return (
    <Suspense fallback={<LoadingScreen isDashboard={isDashboard} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'forgot-password',
          element: <ForgotPassword />,
        },
        {
          path: 'register',
          element: <Register />,
        },
      ],
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: PATH_DASHBOARD.tag.root,
          children: [
            {
              path: PATH_DASHBOARD.tag.list,
              element: <TagList />,
            },
            {
              path: PATH_DASHBOARD.tag.new,
              element: <NewTag />,
            },
            {
              path: PATH_DASHBOARD.tag.edit,
              element: <EditTag />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.product.root,
          children: [
            {
              path: PATH_DASHBOARD.product.list,
              element: <ProductListContainer />,
            },
            {
              path: PATH_DASHBOARD.product.new,
              element: <CreateProductContainer />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.order_management.root,
          children: [
            {
              path: PATH_DASHBOARD.order_management.list,
              element: <OrderListContainer />,
            },
            {
              path: PATH_DASHBOARD.order_management.detail,
              element: <DetailOrderContainer />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.user.root,
          children: [
            {
              path: PATH_DASHBOARD.user.list,
              element: <UserListContainer />,
            },
            {
              path: PATH_DASHBOARD.user.new,
              element: <CreateUserContainer />,
            },
            {
              path: PATH_DASHBOARD.user.changePassword,
              element: <ChangePasswordContainer />,
            },
            {
              path: PATH_DASHBOARD.user.editProfile,
              element: <EditProfileContainer />,
            },
          ],
        },
        {
          path: PATH_DASHBOARD.category.root,
          children: [
            {
              path: PATH_DASHBOARD.category.list,
              element: <CategoryListContainer />,
            },
            {
              path: PATH_DASHBOARD.category.edit_base,
              element: <EditCategoryContainer />,
            },
          ],
        },
        {
          path: '/dashboard',
          element: <StatisticContainer />,
        },
      ],
    },
    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <Page404 /> },
        { path: '403', element: <Page403 /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
// login
const Login = Loadable(lazy(() => import('../../auth/login/Login')));
const ForgotPassword = Loadable(
  lazy(() => import('../../auth/forgot-password/ResetPassword'))
);
const Register = Loadable(lazy(() => import('../../auth/register/Register')));

const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const Page403 = Loadable(lazy(() => import('../pages/Page403')));
const Page404 = Loadable(lazy(() => import('../pages/Page404')));

// Tag
const NewTag = Loadable(lazy(() => import('src/tag/new-tag/index')));
const TagList = Loadable(lazy(() => import('src/tag/tag-list/index')));

const EditTag = Loadable(lazy(() => import('src/tag/tag-edit/index')));

// Product
const ProductListContainer = Loadable(
  lazy(() => import('src/product/list-product/index'))
);
const CreateProductContainer = Loadable(
  lazy(() => import('src/product/create-product/index'))
);

// User
const UserListContainer = Loadable(lazy(() => import('src/users/list-user/index')));
const CreateUserContainer = Loadable(lazy(() => import('src/users/create-user/index')));
const ChangePasswordContainer = Loadable(
  lazy(() => import('../../profile/account-change-password/AccountChangePassword'))
);
const EditProfileContainer = Loadable(
  lazy(() => import('../../profile/account-general/AccountGeneral'))
);

// Category
const CategoryListContainer = Loadable(
  lazy(() => import('src/category/list-category/index'))
);
const EditCategoryContainer = Loadable(lazy(() => import('src/category/edit/index')));

// order
const OrderListContainer = Loadable(lazy(() => import('src/order/list-order')));
const DetailOrderContainer = Loadable(lazy(() => import('src/order/detail-order')));

// statistic
const StatisticContainer = Loadable(lazy(() => import('src/statistic')));
