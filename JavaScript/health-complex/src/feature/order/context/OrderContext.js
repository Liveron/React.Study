import { createContext, useContext } from "react";

export const OrderContext = createContext();

export function useOrderContext() {
  return useContext(OrderContext);
}
