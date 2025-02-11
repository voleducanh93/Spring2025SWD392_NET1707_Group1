import { createBrowserRouter } from "react-router-dom";
import { PATH_NAME } from "../constants/pathName";
import HomePage from "../pages/HomePage/HomePage";
import MainLayout from "../pages/MainLayout/MainLayout";

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
  // {
  //   path: PATH_NAME.LOGIN,
  //   element: <LoginPage />,
  // },
  // {
  //   path: "*",
  //   element: <ErrorPage />,
  // },
]);
