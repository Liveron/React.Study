import { BACKEND_BASE_URL } from "./backend";
import { getAccessToken, getTokens, saveTokens } from "shared/model";
import axios from "axios";

export const api = axios.create({
  baseURL: BACKEND_BASE_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${getAccessToken()}`;
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const tokens = getTokens();
        const response = await axios.post(
          BACKEND_BASE_URL + "/token/refresh",
          tokens
        );
        saveTokens(response.data);
        return api.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
    throw error;
  }
);
