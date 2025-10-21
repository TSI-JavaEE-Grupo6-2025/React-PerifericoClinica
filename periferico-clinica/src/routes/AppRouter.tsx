import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage, AdminLoginPage, ProfesionalLoginPage, AdminDashboardPage, ProfesionalDashboardPage } from '../pages';

import { ROUTES} from './constants/routes';


// Placeholder components para las rutas que aún no existen
const Home = () => <HomePage />;
const AdminLogin = () => <AdminLoginPage />;
const ProfesionalLogin = () => <ProfesionalLoginPage />;
const AdminDashboard = () => <AdminDashboardPage />;
const ProfesionalDashboard = () => <ProfesionalDashboardPage />;


const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <Home/>,
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
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
