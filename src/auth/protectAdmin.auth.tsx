import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";

export const AdminProtectedRoute = () => {
    const auth = useAuth()
    const user = auth.getUser()
    const role = user.role
    console.log(role)
    
    return user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};
