import { api } from "shared/config";
import { PAGINATION_HEADER } from "shared/config/backend";

const URL = "/articlePreviews";

export async function getArticlePreviews(page, size) {
  const params = new URLSearchParams();
  if (page) params.append("pageNumber", page);
  if (size) params.append("pageSize", size);
  const response = await api.get(URL, { params });
  const metaData = JSON.parse(response.headers[PAGINATION_HEADER]);
  return { articlePreviews: response.data, metaData };
}
