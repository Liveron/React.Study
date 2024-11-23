import { useAdminAuthContext } from "feature/user";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAdminAuth } = useAdminAuthContext();

  if (!isAdminAuth) return <Navigate to={"auth"} />;

  return children || <Outlet />;
}

export default ProtectedRoute;
