import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getArticlePreviews } from "feature/article-preview/api/requests";

const PREVIEWS_KEY = "previews";

export function useGetArticlePreviews(page, pageSize) {
  return useQuery({
    queryKey: [PREVIEWS_KEY, page, pageSize],
    queryFn: () => getArticlePreviews(page, pageSize),
    placeholderData: keepPreviousData,
  });
}
