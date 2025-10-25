import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {  
  AdminLoginPage, 
  ProfesionalLoginPage, 
  AdminDashboardPage, 
  ProfesionalDashboardPage, 
  NotFoundPage, 
  RegisterProfessionalPage,
  ClinicSettingPage,
  HomePage,
  RegisterHealthUserPage,
  RegisterAdminUserPage,
  HealthProfessionalListPage,
  HealthUserListPage,
} from '../pages';

import { ROUTES} from './constants/routes';

import { ProtectedHome } from './protectedRoute/ProtectedHome';
import { ProtectedRoute} from './protectedRoute/ProtectedRoute';

// TODO:  Refactorizar las rutas protegidas para que no se repita el protectedRoute en cada ruta 

const Home = () => {
  return (
    <ProtectedHome>
      <HomePage/>
    </ProtectedHome>
  )
}
const AdminLogin = () =>{
  return (
    <ProtectedHome>
      <AdminLoginPage />
    </ProtectedHome>
  )
} 
const ProfesionalLogin = () => {
  return (
    <ProtectedHome>
      <ProfesionalLoginPage />
    </ProtectedHome>
  )
};
const AdminDashboard = () =>{
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <AdminDashboardPage />
    </ProtectedRoute>
  )
} 
const ProfesionalDashboard = () => {
  return (
    <ProtectedRoute requiredRole="PROFESSIONAL">
      <ProfesionalDashboardPage />
    </ProtectedRoute>
  )
}

const RegisterHealthProfessional = () =>{
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <RegisterProfessionalPage />
    </ProtectedRoute>
  )
} 
const AdminClinicSetting = () => 
{
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <ClinicSettingPage />
    </ProtectedRoute>
  )
}
const RegisterHealthUser = () => {
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <RegisterHealthUserPage />
    </ProtectedRoute>
  )
}
const RegisterAdminUser = () => {
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <RegisterAdminUserPage />
    </ProtectedRoute>
  )
}

const HealthProfessionalList = () => {
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <HealthProfessionalListPage />
    </ProtectedRoute>
  )
}
const HealthUserList = () => {
  return (
    <ProtectedRoute requiredRole="ADMIN_CLINIC">
      <HealthUserListPage />
    </ProtectedRoute>
  )
}


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
  {
    path: ROUTES.ADMIN_REGISTER_PROFESSIONALS,
    element: <RegisterHealthProfessional/>,
  },
  {
    path: ROUTES.ADMIN_REGISTER_USERS,
    element: <RegisterHealthUser/>,
  },
  {
    path: ROUTES.ADMIN_REGISTER_ADMIN_USERS,
    element: <RegisterAdminUser/>,
  },
  {
    path: ROUTES.ADMIN_CLINIC_SETTING,
    element: <AdminClinicSetting/>,
  },
  {
    path: ROUTES.ADMIN_PROFESSIONAL_LIST,
    element: <HealthProfessionalList/>,
  },
  {
    path: ROUTES.ADMIN_HEALTH_USER_LIST,
    element: <HealthUserList/>,
  },
  {
    path: "*", // Catch-all route - captura cualquier ruta no definida
    element: <NotFoundPage/>
  }
  
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
