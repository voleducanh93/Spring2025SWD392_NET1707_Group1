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
      { path: "/reset-password", element: <ResetPassword /> },
      { path: "/vaccineSchedule", element: <VaccineByAge /> },
      { path: "/vaccine", element: <VaccineManagement /> },
      { path: "/children", element: <RegistrationForm /> },
      { path: "/vaccine/:id", element: <VaccineDetailPage /> },
      {
        path: "/child-profile",
        element: (
          <PrivateRoute>
            <ChildProfile />{" "}
          </PrivateRoute>
        ),
      },
      {
        path: "/edit-child/:childId",
        element: (
          <PrivateRoute>
            <EditChildProfile />
          </PrivateRoute>
        ),
      },
      { path: "/payment-success", element: <PrivateRoute><ResultPayment /></PrivateRoute> },
      { path: "/payment-failure", element:  <PrivateRoute><ResultPayment /></PrivateRoute> },
      {
        path: "/mybooking",
        element: (
          <PrivateRoute>
            <MyBooking />
          </PrivateRoute>
        ),
      },
      { path: "/chuyen-gia", element: <ChuyengiaPage /> },
      { path: "/confirm-email", element: <ConfirmEmailPage /> },
      { path: "/invetory", element: <PrivateRoute><InventoryManagement /></PrivateRoute> },
      {
        path: "/user-profile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      { path: "/doctor", element: <PrivateRoute><DoctorPage /></PrivateRoute> },
      { path: "/doctor/record/:bookingId", element: <PrivateRoute><DoctorRecord /></PrivateRoute> },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <BookingPage />
          </PrivateRoute>
        ),
      },
      { path: "wallet/deposit-success", element: <PrivateRoute><DepositSuccess /></PrivateRoute> },
      { path: "wallet/deposit-failure", element:  <PrivateRoute><DepositSuccess /></PrivateRoute> },
      { path: "/mywallet", element: <PrivateRoute><Wallet /></PrivateRoute> },
    ],
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },

  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/staff",
    element: <PrivateRoute><StaffPage /></PrivateRoute>,
  },
  { path: "/manager", element: <PrivateRoute><ManagerPage /></PrivateRoute> },
]);
