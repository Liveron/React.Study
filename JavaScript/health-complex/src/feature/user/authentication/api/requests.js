import { api } from "shared/config";

export async function registerUser(user) {
  return api.post("/authentication", user);
}

export async function login(user) {
  return api.post("/authentication/login", user);
}

export async function checkAuth(tokens) {
  return api.post("/token/refresh", tokens);
}
