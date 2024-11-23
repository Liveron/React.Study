import { getTokens, saveTokens } from "shared/model";
import { jwtDecode } from "jwt-decode";
import { BACKEND_BASE_URL } from "shared/config";
import axios from "axios";

export async function checkAdminAuth() {
  try {
    const adminTokens = getTokens();

    if (!checkAdminRole(adminTokens.accessToken)) return false;

    const response = await axios.post(
      `${BACKEND_BASE_URL}/token/refresh`,
      getTokens()
    );

    const refreshedTokens = response.data;

    if (!checkAdminRole(refreshedTokens.accessToken)) return false;

    saveTokens(refreshedTokens);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export function checkAdminRole(adminAccessToken) {
  const token = jwtDecode(adminAccessToken);
  return token.roles.some((role) => role === "Administrator") ? true : false;
}
