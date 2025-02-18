import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";

const PrivateRoute = ({ children }) => {
  // Kiểm tra xem người dùng đã đăng nhập chưa (giả sử token được lưu trữ trong localStorage)
  const { isAuthenticated } = useContext(AppContext);
  // console.log(isAuthenticated);
  // Nếu đã đăng nhập, trả về các route con (children)
  // Nếu chưa đăng nhập, điều hướng đến trang login
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default PrivateRoute;
