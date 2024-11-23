import { useMutation } from "@tanstack/react-query";
import { createRoom } from "feature/room";

export function useCreateRoom(onSuccess) {
  return useMutation({
    mutationFn: createRoom,
    onSuccess,
  });
}
