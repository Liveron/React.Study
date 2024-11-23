import { useQuery } from "@tanstack/react-query";
import { getRoom } from "feature/room";
import { useState } from "react";

export function useRoom(id) {
  const [room, setRoom] = useState();
  const { isLoading } = useQuery({
    queryKey: ["room", id],
    queryFn: async () => {
      const data = await getRoom(id);
      setRoom(data);
      return data;
    },
  });
  return [room, setRoom, isLoading];
}
