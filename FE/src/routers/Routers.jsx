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
import { NoAuthRoute, PrivateRoute } from "./PrivateRoute";
import GioithieuPage from "../pages/ChuyengiaPage/GioithieuPage";
import CamnangPage from "../pages/ChuyengiaPage/CamnangPage";
import BenhHocPage from "../pages/ChuyengiaPage/BenhhocPage";
import CoTheTrePage from "../pages/ChuyengiaPage/CoTheTrePage";
import Covid19Page from "../pages/ChuyengiaPage/Covid19Page";
import DiUngPage from "../pages/ChuyengiaPage/DiUngPage";
import HoHapPage from "../pages/ChuyengiaPage/HoHapPage";
import TongQuatPage from "../pages/ChuyengiaPage/TongQuatPage";
import VaccinePagene from "../pages/ChuyengiaPage/VaccinenePage";

import NhiKhoaPage from "../pages/ChuyengiaPage/NhiKhoaPage";
import TieuHoaPage from "../pages/ChuyengiaPage/TieuHoaPage";
import PageTruyenNhiem from "../pages/ChuyengiaPage/PageTruyenNhiem";


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
        path: PATH_NAME.STAFF,
        element: (
          <PrivateRoute allowedRoles={["Staff"]}>
            <StaffPage />
          </PrivateRoute>
        ),
      },
      {
        path: PATH_NAME.CHILD_PROFILE,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <ChildProfile />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.EDIT_CHILD,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <EditChildProfile />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.PAYMENT_SUCCESS,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <ResultPayment />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.PAYMENT_FAILURE,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <ResultPayment />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.MY_BOOKING,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <MyBooking />
          </PrivateRoute>
        ),
      },

      { path: PATH_NAME.CHUYEN_GIA, element: <ChuyengiaPage /> },
      { path: PATH_NAME.CAM_NANG, element: <CamnangPage /> },
      { path: PATH_NAME.BENH_HOC, element: <BenhHocPage /> },
      { path: PATH_NAME.CO_THE_TRE, element: <CoTheTrePage /> },
      { path: PATH_NAME.COVID19, element: <Covid19Page /> },
      { path: PATH_NAME.DI_UNG, element: <DiUngPage /> },
      { path: PATH_NAME.HO_HAP, element: <HoHapPage /> },
      { path: PATH_NAME.TONG_QUAT, element: <TongQuatPage /> },
      { path: PATH_NAME.VACCINE_PAGEE, element: <VaccinePagene /> },
      { path: PATH_NAME.NHI, element: <NhiKhoaPage /> },
      { path: PATH_NAME.TRUYEN_NHIEM, element: <PageTruyenNhiem /> },
      { path: PATH_NAME.TIEU_HOA, element: <TieuHoaPage /> },
      { path: PATH_NAME.GIOI_THIEU, element: <GioithieuPage /> },
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
          <PrivateRoute allowedRoles={["Customer","Doctor","Admin","Manager","Staff"]}>
            <UserProfile />
          </PrivateRoute>
        ),
      },

      
      

      {
        path: PATH_NAME.BOOKING,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <BookingPage />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.WALLET_DEPOSIT_SUCCESS,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <DepositSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.WALLET_DEPOSIT_FAILURE,
        element: (
          <PrivateRoute allowedRoles={["Customer"]}>
            <DepositSuccess />
          </PrivateRoute>
        ),
      },

      {
        path: PATH_NAME.MY_WALLET,
        element: (
          <PrivateRoute allowedRoles={["Customer","Admin"]}>
            <Wallet />
          </PrivateRoute>
        ),
      },
    ],
  },

  { path: PATH_NAME.AUTH, element: <NoAuthRoute><AuthPage /></NoAuthRoute> },
  { path: PATH_NAME.ADMIN, element: <PrivateRoute allowedRoles={["Admin"]}>
  <AdminPage />
</PrivateRoute> },
{
  path: PATH_NAME.DOCTOR,
  element: <PrivateRoute allowedRoles={["Doctor"]}><DoctorPage /></PrivateRoute>,
},

  {
    path: PATH_NAME.DOCTOR_RECORD,
    element: (
      <PrivateRoute allowedRoles={["Doctor"]}>
        <DoctorRecord />
      </PrivateRoute>
    ),
  },
  {
    path: PATH_NAME.MANAGER,
    element: (
      <PrivateRoute allowedRoles={["Manager"]}>
        <ManagerPage />
      </PrivateRoute>
    ),
  },
]);
