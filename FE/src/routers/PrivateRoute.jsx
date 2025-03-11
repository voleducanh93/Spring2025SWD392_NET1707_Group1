import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  
 
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  
  return children;
};

export default PrivateRoute;
