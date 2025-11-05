import React from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
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
  AdminUserListPage,
  ClinicDetailPage,
  ProfessionalCreateDoc,
  ProfessionalHistoryClinicPage,
  ProfessionalDocumentPreviewPage,
} from '../pages';

import { ROUTES} from './constants/routes';

import { ProtectedHome } from './protectedRoute/ProtectedHome';
import { ProtectedRoute} from './protectedRoute/ProtectedRoute';

const router = createBrowserRouter([
  
  {
    path: ROUTES.HOME,
    element: (
      <ProtectedHome>
        <HomePage />
      </ProtectedHome>
    ),
  },
  {
    path: ROUTES.ADMIN_LOGIN,
    element: (
      <ProtectedHome>
        <AdminLoginPage />
      </ProtectedHome>
    ),
  },
  {
    path: ROUTES.PROFESIONAL_LOGIN,
    element: (
      <ProtectedHome>
        <ProfesionalLoginPage />
      </ProtectedHome>
    ),
  },

  // Rutas protegidas de Administrador
  {
    element: (
      <ProtectedRoute requiredRole="ADMIN_CLINIC">
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.ADMIN_DASHBOARD,
        element: <AdminDashboardPage />,
      },
      {
        path: ROUTES.ADMIN_REGISTER_PROFESSIONALS,
        element: <RegisterProfessionalPage />,
      },
      {
        path: ROUTES.ADMIN_REGISTER_USERS,
        element: <RegisterHealthUserPage />,
      },
      {
        path: ROUTES.ADMIN_REGISTER_ADMIN_USERS,
        element: <RegisterAdminUserPage />,
      },
      {
        path: ROUTES.ADMIN_CLINIC_SETTING,
        element: <ClinicSettingPage />,
      },
      {
        path: ROUTES.ADMIN_PROFESSIONAL_LIST,
        element: <HealthProfessionalListPage />,
      },
      {
        path: ROUTES.ADMIN_HEALTH_USER_LIST,
        element: <HealthUserListPage />,
      },
      {
        path: ROUTES.ADMIN_ADMIN_USER_LIST,
        element: <AdminUserListPage />,
      },
      {
        path: ROUTES.ADMIN_CLINIC_DETAILS,
        element: <ClinicDetailPage />,
      },
    ],
  },

  // Rutas protegidas de Profesional
  {
    element: (
      <ProtectedRoute requiredRole="PROFESSIONAL">
        <Outlet />
      </ProtectedRoute>
    ),
    children: [
      {
        path: ROUTES.PROFESIONAL_DASHBOARD,
        element: <ProfesionalDashboardPage />,
      },
      {
        path: ROUTES.PROFESSIONAL_NEW_DOCUMENT,
        element: <ProfessionalCreateDoc />,
      },
      {
        path: ROUTES.PROFESSIONAL_SEARCH_PATIENT,
        element: <ProfessionalHistoryClinicPage />,
      },
      {
        path: ROUTES.PROFESSIONAL_DOCUMENT_PREVIEW,
        element: <ProfessionalDocumentPreviewPage />,
      },
    ],
  },

  // Ruta catch-all
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

export const AppRouter: React.FC = () => {
  return <RouterProvider router={router} />;
};
