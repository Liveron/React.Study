import { useEffect, useState } from "react";
import { AuthContext } from "../../feature/user/authentication/context/AuthContext";
import AuthBackground from "../../feature/user/authentication/ui/AuthBackground";
import { BACKEND_BASE_URL } from "shared/config";
import {
  getAccessToken,
  getTokens,
  saveTokens,
} from "shared/model/tokenHelpers";
import axios from "axios";

function AuthContextProvider({ children }) {
  const [formEnabled, setFormEnabled] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const controller = new AbortController();

    (async () => {
      if (getAccessToken()) {
        try {
          const response = await axios.post(
            BACKEND_BASE_URL + "/token/refresh",
            getTokens(),
            { signal: controller.signal }
          );
          if (response.status === 200) {
            saveTokens(response.data);
            setIsAuth(true);
          } else console.error(`HTTP error! Status: ${response.status}`);
        } catch (error) {
          if (!axios.isCancel(error)) console.error(error);
        }
      }
    })();

    return () => controller.abort();
  }, []);

  function handleClick() {
    setFormEnabled(false);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        enableForm: () => setFormEnabled(true),
        disableForm: () => setFormEnabled(false),
      }}
    >
      {!isAuth && formEnabled && <AuthBackground onClick={handleClick} />}
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
