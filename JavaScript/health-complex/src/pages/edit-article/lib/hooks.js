import { ARTICLE_PREVIEWS_QUERY_KEY, useGetArticle } from "feature/article";
import {
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} from "feature/article";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

export function useEditArticle() {
  const { id } = useParams();
  const [article, setArticle] = useState();
  const [preview, setPreview] = useState();
  const [previewImageUrl, setPreviewImageUrl] = useState();

  const { isLoading } = useGetArticle(id, (article) => {
    setArticle({ title: article.title, content: article.content });
    setPreview({ ...article.preview });
  });

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const updateArticle = useUpdateArticleMutation(id, () => {
    toast.success("Успешно изменено!");
    queryClient.invalidateQueries([ARTICLE_PREVIEWS_QUERY_KEY]);
    navigate("/admin/articles");
  });

  const deleteArticle = useDeleteArticleMutation(id, () => {
    toast.success("Успешно удалено!");
    queryClient.invalidateQueries([ARTICLE_PREVIEWS_QUERY_KEY]);
    navigate("/admin/articles");
  });

  return {
    article,
    setArticle,
    preview,
    setPreview,
    previewImageUrl,
    setPreviewImageUrl,
    isLoading,
    deleteArticle,
    updateArticle,
  };
}
