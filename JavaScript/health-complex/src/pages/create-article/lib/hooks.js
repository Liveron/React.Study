import { useQueryClient } from "@tanstack/react-query";
import {
  ARTICLE_PREVIEWS_QUERY_KEY,
  useCreateArticleMutation,
} from "feature/article";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function useCreateArticle() {
  const [article, setArticle] = useState();
  const [articlePreview, setArticlePreview] = useState();
  const [previewImageUrl, setPreviewImageUrl] = useState();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createArticle = useCreateArticleMutation(() => {
    navigate("admin/articles");
    queryClient.invalidateQueries([ARTICLE_PREVIEWS_QUERY_KEY]);
  });
  return {
    article,
    setArticle,
    articlePreview,
    setArticlePreview,
    previewImageUrl,
    setPreviewImageUrl,
    createArticle,
  };
}
