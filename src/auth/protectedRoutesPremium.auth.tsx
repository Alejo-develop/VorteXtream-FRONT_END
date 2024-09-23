import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";
import useAlert from "../pages/private/userMenu/components/alert.component";

export const PremiumProtectedRoute = () => {
    const auth = useAuth()
    const {showAlert} = useAlert()

    if(!auth.isPremium){
        showAlert('error', 'First you must be a Super Fan!', '' )
    }

    return auth.isPremium === true ? <Outlet /> : <Navigate to="/checkout" />;
};
