import { createBrowserRouter } from "react-router-dom";
import { PATH_NAME } from "../constants/pathName";

import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../pages/MainLayout/MainLayout";
import AuthPage from "../pages/AuthPage/AuthPage";
import ResetPassword from "../pages/AuthPage/resetPassword";
import VaccineByAge from "../pages/ManagerPage/VaccineByAge";
import ManagerPage from "../pages/ManagerPage/ManagerPage";
import ChildProfile from "../pages/ProfilePage/ChildProfile";
import EditChildProfile from "../pages/ProfilePage/EditChildProfile";
import BookingPage from "../pages/BookingPage/BookingPage";
import PrivateRoute from "./PrivateRoute";
import VaccineManagement from "../pages/ManagerPage/VaccineManagement";
import RegistrationForm from "../pages/ProfilePage/ProfilePage";
import VaccineDetailPage from "../pages/VaccineDetailPage/VaccineDetailPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import StaffPage from "../pages/StaffPage/StaffPage";
import ResultPayment from "../pages/PaymentPage/ResultPayment";
import MyBooking from "../pages/BookingPage/MyBooking";
import ChuyengiaPage from "../pages/ChuyengiaPage/ChuyengiaPage";
import ConfirmEmailPage from "../pages/AuthPage/confirmEmail";
import InventoryManagement from "../pages/ManagerPage/InventoryManagement";
import DepositSuccess from "../pages/BookingPage/DepositSuccess";
import Wallet from "../pages/WalletPage/Wallet";
import UserProfile from "../pages/ProfilePage/UserProfile";
import DoctorPage from "../pages/DoctorPage/Doctor";
import DoctorRecord from "../pages/DoctorPage/DoctorRecord";

export const router = createBrowserRouter([
  {
    path: PATH_NAME.HOME,
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: PATH_NAME.RESET_PASSWORD, element: <ResetPassword /> },
      { path: PATH_NAME.VACCINE_SCHEDULE, element: <VaccineByAge /> },
      { path: PATH_NAME.VACCINE, element: <VaccineManagement /> },
      { path: PATH_NAME.CHILDREN, element: <RegistrationForm /> },
      { path: PATH_NAME.VACCINE_DETAIL, element: <VaccineDetailPage /> },

      {
        path: PATH_NAME.CHILD_PROFILE,
        element: (
          <PrivateRoute>
            <ChildProfile />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.EDIT_CHILD,
        element: (
          <PrivateRoute>
            <EditChildProfile />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.PAYMENT_SUCCESS,
        element: (
          <PrivateRoute>
            <ResultPayment />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.PAYMENT_FAILURE,
        element: (
          <PrivateRoute>
            <ResultPayment />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.MY_BOOKING,
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },

      { path: PATH_NAME.CHUYEN_GIA, element: <ChuyengiaPage /> },
      { path: PATH_NAME.CONFIRM_EMAIL, element: <ConfirmEmailPage /> },

      {
        path: PATH_NAME.INVENTORY,
        element: (
          <PrivateRoute>
            <InventoryManagement />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.USER_PROFILE,
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.DOCTOR,
        element: (
          <PrivateRoute>
            <DoctorPage />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.DOCTOR_RECORD,
        element: (
          <PrivateRoute>
            <DoctorRecord />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.BOOKING,
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.WALLET_DEPOSIT_SUCCESS,
        element: (
          <PrivateRoute>
            <DepositSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.WALLET_DEPOSIT_FAILURE,
        element: (
          <PrivateRoute>
            <DepositSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.MY_WALLET,
        element: (
          <PrivateRoute>
            <Wallet />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: PATH_NAME.AUTH, element: <AuthPage /> },
  { path: PATH_NAME.ADMIN, element: <AdminPage /> },
  {
    path: PATH_NAME.STAFF,
    element: (
      <PrivateRoute>
        <StaffPage />
      </PrivateRoute>
    ),
  },
  {
    path: PATH_NAME.MANAGER,
    element: (
      <PrivateRoute>
        <ManagerPage />
      </PrivateRoute>
    ),
  },
]);
