import { useAuthState } from "@/zustand/authStore";
import { Navigate, Outlet } from "react-router-dom";


function ProtectedRoutes() {

    const isAuthenticated = useAuthState(state=>state.isAuthenticated)

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
  return (
    <Outlet />
  )
}

export default ProtectedRoutes