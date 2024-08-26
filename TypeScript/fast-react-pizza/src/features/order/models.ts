import { CartModel } from "../cart/models";

export type OrderModel = {
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  id: string;
  status: string;
  priorityPrice: number;
  orderPrice: number;
  estimatedDelivery: string;
  cart: CartModel[];
};
