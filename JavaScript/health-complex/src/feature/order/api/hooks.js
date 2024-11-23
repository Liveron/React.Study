import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { deleteOrder, getOrders, updateOrder, createOrder } from "./requests";
import { useMutation } from "@tanstack/react-query";

const ORDERS_KEY = "orders";

export function useGetOrders(page, size, onExecuted = () => {}) {
  return useQuery({
    queryKey: [ORDERS_KEY, page, size],
    queryFn: async () => {
      const data = await getOrders(page, size);
      onExecuted(data);
      return data;
    },
    placeholderData: keepPreviousData,
  });
}

export function useDeleteOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries([ORDERS_KEY]);
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, order }) => updateOrder(id, order),
    onSuccess: () => {
      queryClient.invalidateQueries([ORDERS_KEY]);
    },
  });
}

export function useCreateOrder(onSuccess) {
  return useMutation({
    mutationFn: createOrder,
    onSuccess,
  });
}
