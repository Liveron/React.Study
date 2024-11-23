import { useMutation } from "@tanstack/react-query";
import { login, registerUser } from "./requests";

export function useRegisterUser(onSuccess) {
  return useMutation({
    mutationFn: (user) => registerUser(user),
    onSuccess,
  });
}

export function useLoginUser(onSuccess) {
  return useMutation({
    mutationFn: (user) => login(user),
    onSuccess,
  });
}
