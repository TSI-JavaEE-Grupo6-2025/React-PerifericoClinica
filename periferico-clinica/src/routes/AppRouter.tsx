import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {  AdminLoginPage, ProfesionalLoginPage, AdminDashboardPage, ProfesionalDashboardPage, NotFoundPage } from '../pages';

import { ROUTES} from './constants/routes';

import { ProtectedHome } from './protectedRoute/ProtectedHome';

// Placeholder components para las rutas que aún no existen

const AdminLogin = () => <AdminLoginPage />;
const ProfesionalLogin = () => <ProfesionalLoginPage />;
const AdminDashboard = () => <AdminDashboardPage />;
const ProfesionalDashboard = () => <ProfesionalDashboardPage />;


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ProtectedHome/>,
  },
  {
    path: ROUTES.ADMIN_DASHBOARD,
    element: <AdminDashboard />,
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    element: <AdminLogin />,
  },
  {
    path: ROUTES.PROFESIONAL_LOGIN,
    element: <ProfesionalLogin />,
  },
  {
    path: ROUTES.PROFESIONAL_DASHBOARD,
    element: <ProfesionalDashboard/>,
  },
  {
    path: "/404",
    element: <NotFoundPage/>
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
