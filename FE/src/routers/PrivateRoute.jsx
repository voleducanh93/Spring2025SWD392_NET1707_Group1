import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  console.log(isAuthenticated);
  
  // Nếu chưa đăng nhập, điều hướng đến trang login
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  // Nếu đã đăng nhập, trả về children (component cần bảo vệ)
  return children;
};

export default PrivateRoute;
