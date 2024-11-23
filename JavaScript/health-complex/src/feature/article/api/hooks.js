import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createArticle,
  updateArticle,
  deleteArticle,
  getArticle,
} from "./requests";
import { ARTICLE_PREVIEWS_QUERY_KEY } from "../config/constants";

export function useCreateArticleMutation(onSuccess) {
  return useMutation({
    mutationFn: createArticle,
    onSuccess,
  });
}

export function useUpdateArticleMutation(id, onSuccess) {
  return useMutation({
    mutationFn: (article) => updateArticle(id, article),
    onSuccess,
  });
}

export function useDeleteArticleMutation(id, onSuccess) {
  return useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess,
  });
}

export function useGetArticle(id, onExecuted = () => {}) {
  return useQuery({
    queryKey: [ARTICLE_PREVIEWS_QUERY_KEY, id],
    queryFn: async () => {
      const article = await getArticle(id);
      onExecuted(article);
      return article;
    },
  });
}
