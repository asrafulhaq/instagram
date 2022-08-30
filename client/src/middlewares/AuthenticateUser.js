import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


// create authenticate 
const AuthenticateUser = ({ children }) => {

    const { isUserLoggedIn } = useContext(AuthContext);
    return isUserLoggedIn ? children : <Navigate to="/login" />;


}

// export middlewares 
export default AuthenticateUser;