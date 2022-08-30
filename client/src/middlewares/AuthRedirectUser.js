import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


// create authenticate 
const AuthRedirectUser = ({ children }) => {

    const { isUserLoggedIn } = useContext(AuthContext);
    return isUserLoggedIn ? <Navigate to="/" /> : children;


}

// export middlewares 
export default AuthRedirectUser;