import { createBrowserRouter } from "react-router-dom";
import { PATH_NAME } from "../constants/pathName";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../pages/MainLayout/MainLayout";
import AuthPage from "../pages/AuthPage/AuthPage";
import ResetPassword from "../pages/AuthPage/resetPassword";
import VaccineByAge from "../pages/ManagerPage/VaccineByAge";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import PrivateRoute from "./PrivateRoute";

import VaccineManagement from "../pages/ManagerPage/VaccineManagement";
import RegistrationForm from "../pages/ProfilePage/ProfilePage";
import VaccineDetailPage from "../pages/VaccineDetailPage/VaccineDetailPage";

export const router = createBrowserRouter([
  {
    path: PATH_NAME.HOME,
    element: (
      // <PrivateRoute>
      <MainLayout />
      // </PrivateRoute>
    ),
    children: [
      // index: true
      { index: true, element: <HomePage /> },
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/vaccineSchedule", element: <VaccineByAge /> },
      { path: "/manager-page", element: <ManagerPage /> },
      { path: "/vaccine", element: <VaccineManagement /> },
      { path: "/children", element: <RegistrationForm /> },
      { path: "/vaccine-detail", element: <VaccineDetailPage /> },
    ],
  },
  {
    path: "/auth",
    element: (
      <PrivateRoute>
        <AuthPage />
      </PrivateRoute>
    ),
  },
]);
