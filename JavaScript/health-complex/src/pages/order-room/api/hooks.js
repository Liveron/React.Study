import { useGetRooms } from "feature/room";
import { useState } from "react";

export function useRooms(defaultPage, defaultPageSize) {
  const [page, setPage] = useState(defaultPage);
  const { data, isLoading, isPlaceholderData } = useGetRooms(
    page,
    defaultPageSize
  );
  console.log(data);
  return {
    rooms: data?.rooms,
    metaData: data?.metaData,
    isLoading,
    isPlaceholderData,
    page,
    setPage,
  };
}
