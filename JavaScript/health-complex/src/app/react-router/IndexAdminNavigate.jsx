import { useAdminAuthContext } from "feature/user";
import { Navigate } from "react-router-dom";

function IndexAdminNavigate() {
  const { isAuth } = useAdminAuthContext();

  return <Navigate to={isAuth ? "articles" : "auth"} />;
}

export default IndexAdminNavigate;
