import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";

export const AdminProtectedRoute = () => {
    const auth = useAuth()
    const user = auth.getUser()
    
    return user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};
