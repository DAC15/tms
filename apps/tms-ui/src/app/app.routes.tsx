import { Authenticate } from '@tms/ui-auth';
import { RouteWithMeta } from '@tms/ui-components';
import { Navigate, Outlet } from 'react-router-dom';
import { LoginPage, MainPage, RegisterPage } from './pages';

export const AppRoutes = [
  {
    path: '',
    element: <Authenticate children={<MainPage />} />,
    children: [
      {
        path: '',
        element: (
          <RouteWithMeta
            route={<div>Tasks are here</div>}
            title="Manage your tasks"
          />
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: 'auth',
    element: <Outlet />,
    children: [
      {
        path: '',
        element: <Navigate to="login" replace />,
      },
      {
        path: 'login',
        element: (
          <RouteWithMeta
            route={<LoginPage />}
            title="Login into your account"
          />
        ),
      },
      {
        path: 'register',
        element: (
          <RouteWithMeta route={<RegisterPage />} title="Create an account" />
        ),
      },
      {
        path: '*',
        element: <Navigate to="login" replace />,
      },
    ],
  },
];
