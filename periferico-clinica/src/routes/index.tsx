import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, AdminLoginPage, ProfesionalLoginPage } from '../pages';

import { ROUTES} from './constants/routes';

// Placeholder components para las rutas que aún no existen
const AdminLogin = () => <AdminLoginPage />;
const ProfesionalLogin = () => <ProfesionalLoginPage />;

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <HomePage />,
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    element: <AdminLogin />,
  },
  {
    path: ROUTES.PROFESIONAL_LOGIN,
    element: <ProfesionalLogin />,
  },
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
