import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";

export const IsNotPremiumProtectedRoute = () => {
    const auth = useAuth()

    return auth.isPremium === false ? <Outlet /> : <Navigate to="/" />;
};
