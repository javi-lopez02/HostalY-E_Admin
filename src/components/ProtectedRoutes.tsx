import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

function ProtectedRoutes() {
  const { isAuth, loading } = useAuth()

  if (loading) {
    return (
      <h1>Cargando...</h1>
    )
  }

  if (!isAuth && !loading) return <Navigate to="/login" replace />;

  return <Outlet />;
}

export default ProtectedRoutes