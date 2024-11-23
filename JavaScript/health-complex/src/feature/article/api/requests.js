import { api } from "shared/config";

const URL = "/articles";
const PAGINATION_HEADER = "x-pagination";

export function createArticle(article) {
  return api.post(URL, article);
}

export function updateArticle(id, article) {
  return api.put(`${URL}/${id}`, article);
}

export function deleteArticle(id) {
  return api.delete(`${URL}/${id}`);
}

export async function getArticle(id) {
  const response = await api.get(`${URL}/${id}`);
  return response.data;
}

export async function getArticles(page, size, fields) {
  try {
    const params = new URLSearchParams();
    if (page) params.append("pageNumber", page);
    if (size) params.append("pageSize", size);
    if (fields) {
      const fieldsString = fields.join(",");
      params.append("fields", fieldsString);
    }
    const response = await api.get(URL, { params });
    const metaData = JSON.parse(response.headers[PAGINATION_HEADER]);
    return { articles: response.data, metaData };
  } catch (error) {
    console.error("Error getting orders:", error);
    throw error;
  }
}
