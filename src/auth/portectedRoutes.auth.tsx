import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";
import useAlert from "../pages/private/userMenu/components/alert.component";

export const ProtectedRoute = () =>{
    const auth = useAuth()
    const { showAlert } = useAlert()

    if(!auth.isAuthenticated){
        showAlert('error', 'First register to do this', 'SignUp or Login!')
    }

    return auth.isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}