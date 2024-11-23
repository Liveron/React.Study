import { api } from "shared/config";

const URL = "/orders";
const PAGINATION_HEADER = "x-pagination";

export function createOrder(order) {
  api.post(URL, order);
}

export async function getOrders(page, pageSize) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("pageNumber", page);
    if (pageSize) params.append("pageSize", pageSize);
    const response = await api.get(URL, { params });
    const metaData = JSON.parse(response.headers[PAGINATION_HEADER]);
    return { orders: response.data, metaData };
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

export async function deleteOrder(id) {
  await api.delete(`${URL}/${id}`);
}

export async function updateOrder(id, order) {
  await api.put(`${URL}/${id}`, order);
}
