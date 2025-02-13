import { createBrowserRouter } from "react-router-dom";
import { PATH_NAME } from "../constants/pathName";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../pages/MainLayout/MainLayout";
import AuthPage from "../pages/AuthPage/AuthPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";

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
    ],
  },
  {
    path: PATH_NAME.LOGIN,
    element: <AuthPage />,
  },
  {
    path: PATH_NAME.PROFILE,
    element: <ProfilePage />,
  },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);
