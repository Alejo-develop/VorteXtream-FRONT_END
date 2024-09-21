import { Navigate, Outlet } from "react-router-dom";

export const AdminProtectedRoute = () => {
    const userString = localStorage.getItem('user'); 
    const user = userString ? JSON.parse(userString) : null;

    console.log(user); 

    
    return user && user.role === 'admin' ? <Outlet /> : <Navigate to="/" />;
};
