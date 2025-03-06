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
import UploadForm from "../pages/AuthPage/upload";

import VaccineDetailPage from "../pages/VaccineDetailPage/VaccineDetailPage";
import AdminPage from "../pages/AdminPage/AdminPage";
import StaffPage from "../pages/StaffPage/StaffPage";
import ResultPayment from "../pages/PaymentPage/ResultPayment";
import MyBooking from "../pages/BookingPage/MyBooking";
import ChuyengiaPage from "../pages/ChuyengiaPage/ChuyengiaPage";
import ConfirmEmailPage from "../pages/AuthPage/confirmEmail";
import InventoryManagement from "../pages/ManagerPage/InventoryManagement";
import UserProfile from "../pages/ProfilePage/UserProfile";
import DepositSuccess from "../pages/BookingPage/DepositSuccess";



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
      { path: "/manager", element: <ManagerPage /> },
      { path: "/vaccine", element: <VaccineManagement /> },
      { path: "/children", element: <UploadForm /> },
      { path: "/children", element: <RegistrationForm /> },
      { path:"/vaccine/:id", element: <VaccineDetailPage /> },
      { path: "/child-profile", element: <ChildProfile /> },
      { path: "/edit-child/:childId", element: <EditChildProfile /> },
      {
        path: "/payment-success",
        element: <ResultPayment />,
      },
      {
        path: "/payment-failure",
        element: <ResultPayment />,
      },
      { path: "/mybooking", element: <MyBooking /> },
      { path: "/chuyen-gia", element: <ChuyengiaPage/>},
      { path: "/confirm-email", element: <ConfirmEmailPage/>},
      { path: "/invetory", element: <InventoryManagement/>},
      {
        path: "/booking",
        element: <PrivateRoute>
        <BookingPage />
      </PrivateRoute>,
      },
      {
        path: "wallet/deposit-success",
        element: <DepositSuccess />,
      },
      {
        path: "wallet/deposit-failure",
        element: <DepositSuccess />,
      }
     
    ],
  },
  {
    path: "/auth",
    element: (     
        <AuthPage />
    ),
  },
  
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/staff",
    element: <StaffPage />,
  },
]);
