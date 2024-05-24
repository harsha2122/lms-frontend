import { Navigate } from "react-router-dom";
import { useAuth } from "../../Auth/auth";

const Protected = ({ isLoggedIn, children,replace }) => {

    const auth = useAuth()

    // console.log(isLoggedIn,replace,auth.user)
    if (!isLoggedIn) {
    return <Navigate to={`/${replace}`} replace />;
    }
    return children;
};
export default Protected;