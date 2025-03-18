import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../contexts/app.context";
import PropTypes from 'prop-types';


const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AppContext);
  
 
  if (!isAuthenticated) {
    return <Navigate to="/auth" />;
  }

  
  return children;
};
PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};


export default PrivateRoute;
