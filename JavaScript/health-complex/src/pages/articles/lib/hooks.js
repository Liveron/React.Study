import { useState } from "react";
import { useGetArticlePreviews } from "feature/article-preview";

export function useArticlePreviews(defaultPage, defaultPageSize) {
  const [page, setPage] = useState(defaultPage);
  const { data, isLoading, isPlaceholderData } = useGetArticlePreviews(
    page,
    defaultPageSize
  );
  return {
    articlePreviews: data?.articlePreviews,
    metaData: data?.metaData,
    isLoading,
    isPlaceholderData,
    page,
    setPage,
  };
}
