import { createContext, useContext } from "react";

export const AuthContext = createContext();
export const AdminAuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

export function useAdminAuthContext() {
  return useContext(AdminAuthContext);
}
