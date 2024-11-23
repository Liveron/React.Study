import { useGetOrders } from "feature/order";
import { useState } from "react";

export function useOrders(defaultPage, defaultPageSize) {
  const [page, setPage] = useState(defaultPage);
  const [orders, setOrders] = useState();
  const { data, isLoading, isPlaceholderData } = useGetOrders(
    page,
    defaultPageSize,
    (data) => {
      setOrders(data?.orders);
    }
  );
  return {
    orders,
    setOrders,
    page,
    setPage,
    metaData: data?.metaData,
    isLoading,
    isPlaceholderData,
  };
}
