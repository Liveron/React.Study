import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { editRoom, getRooms } from "./requests";
import { deleteRoom } from "./requests";
import { keepPreviousData } from "@tanstack/react-query";

const ROOMS_KEY = "rooms";

export function useDeleteRoom(onSuccess) {
  return useMutation({
    mutationFn: deleteRoom,
    onSuccess,
  });
}

export function useGetRooms(page, pageSize) {
  return useQuery({
    queryKey: [ROOMS_KEY, page],
    queryFn: () => getRooms(page, pageSize),
    placeholderData: keepPreviousData,
  });
}

export function useUpdateRoom(onSuccess) {
  return useMutation({
    mutationFn: ({ id, room }) => editRoom(id, room),
    onSuccess,
  });
}
