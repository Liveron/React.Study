import { useOrderContext, OrderContext } from "./context/OrderContext";
import ConfirmOrderForm from "./ui/ConfirmOrderForm";
import { createOrder } from "./api/requests";
import {
  useDeleteOrder,
  useGetOrders,
  useUpdateOrder,
  useCreateOrder,
} from "./api/hooks";
import OrderPreview from "./ui/OrderPreview";

export { useDeleteOrder, useGetOrders, useUpdateOrder, useCreateOrder };

export {
  useOrderContext,
  OrderContext,
  ConfirmOrderForm,
  createOrder,
  OrderPreview,
};
