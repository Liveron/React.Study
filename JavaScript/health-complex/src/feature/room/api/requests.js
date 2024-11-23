import { api } from "shared/config";

const URL = "/rooms";
const PAGINATION_HEADER = "x-pagination";

export function createRoom(room) {
  return api.post(URL, room);
}

export function deleteRoom(id) {
  api.delete(`${URL}/${id}`);
}

export async function getRooms(page, size) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("pageNumber", page);
    if (size) params.append("pageSize", size);
    const response = await api.get(URL, { params });
    const metaData = JSON.parse(response.headers[PAGINATION_HEADER]);
    return { rooms: response.data, metaData };
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}

export async function getRoom(id) {
  const response = await api.get(`/rooms/${id}`);
  return response.data;
}

export function editRoom(id, room) {
  return api.put(`/rooms/${id}`, room);
}
