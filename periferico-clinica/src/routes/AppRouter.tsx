import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {  
  AdminLoginPage, 
  ProfesionalLoginPage, 
  AdminDashboardPage, 
  ProfesionalDashboardPage, 
  NotFoundPage, 
  RegisterProfessionalPage 
} from '../pages';

import { ROUTES} from './constants/routes';

import { ProtectedHome } from './protectedRoute/ProtectedHome';

// Placeholder components para las rutas que aún no existen

const AdminLogin = () => <AdminLoginPage />;
const ProfesionalLogin = () => <ProfesionalLoginPage />;
const AdminDashboard = () => <AdminDashboardPage />;
const ProfesionalDashboard = () => <ProfesionalDashboardPage />;

const RegisterHealthProfessional = () => <RegisterProfessionalPage />;


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <ProtectedHome/>,
  },
  {
    path: "/404",
    element: <NotFoundPage/>
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
    path: ROUTES.ADMIN_PROFESSIONALS,
    element: <RegisterHealthProfessional/>,
  }
  
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
