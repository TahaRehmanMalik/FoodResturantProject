import { useSelector } from "react-redux";
import { selectAccessToken } from "../Auth/authSlice";
import Login from "../Auth/component/Login";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({children}) => {
  const user = useSelector(selectAccessToken);
  
  console.log("Children is", children);
  console.log("The user is", user);

  if (!user) {
    return <Navigate to='/login' replace={true}/> ;
  }

  return children;
};

export default ProtectedRoute;
