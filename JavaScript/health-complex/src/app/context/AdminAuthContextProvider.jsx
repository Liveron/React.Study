import { Outlet } from "react-router-dom";
import { AdminAuthContext } from "../../feature/user/authentication/context/AuthContext";
import { useEffect, useState } from "react";
import { checkAdminAuth } from "../../feature/user/authentication/lib/utils";
function AdminAuthContextProvider() {
  const [isAdminAuth, setIsAdminAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const isAuth = await checkAdminAuth();
      setIsAdminAuth(isAuth);
      setIsLoading(false);
    })();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAdminAuth, setIsAdminAuth }}>
      {isLoading ? "Загрузка" : <Outlet />}
    </AdminAuthContext.Provider>
  );
}

export default AdminAuthContextProvider;
