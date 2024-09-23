import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./auth.provider";

export const PremiumProtectedRoute = () => {
    const auth = useAuth()

    return auth.isPremium === false ? <Outlet /> : <Navigate to="/" />;
};
