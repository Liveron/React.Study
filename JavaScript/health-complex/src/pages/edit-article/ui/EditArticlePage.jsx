import { useState } from "react";
import { EditableArticlePreview } from "feature/article-preview";
import { Article } from "feature/article";
import { Poster } from "widgets/poster";
import { AnimatedButton } from "shared/ui";
import { useEditArticle } from "../lib/hooks";

import styled from "styled-components";

const StyledEditArticlePage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const TitleContainer = styled.nav`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  color: var(--color-red-1);
`;

const PreviewContainer = styled.li`
  height: 70%;
  width: 22%;
  color: var(--color-red-2);
  font-weight: bold;
`;

const StyledAnimatedButton = styled(AnimatedButton)`
  font-weight: bold;
`;

const Edit = {
  PREVIEW: "PREVIEW",
  ARTICLE: "ARTICLE",
};

function EditArticlePage() {
  const {
    article,
    setArticle,
    preview,
    setPreview,
    previewImageUrl,
    setPreviewImageUrl,
    isLoading,
    updateArticle,
    deleteArticle,
  } = useEditArticle();
  const [edit, setEdit] = useState(Edit.PREVIEW);

  function handlePreviewTitleChange(title) {
    setPreview((preview) => ({ ...preview, title }));
  }

  function handlePreviewImageChanged(e) {
    e.preventDefault();
    URL.revokeObjectURL(previewImageUrl);
    setPreview((preview) => ({ ...preview, image: e.image }));
    setPreviewImageUrl(e.imageUrl);
  }

  function handleArticleTitleChange(title) {
    setArticle((article) => ({ ...article, title }));
  }

  function handleArticleContentChange(content) {
    setArticle((article) => ({ ...article, content }));
  }

  function handleUpdateArticle() {
    const updatedArticle = {
      title: article.title,
      content:
        typeof article.content === "string"
          ? article.content
          : JSON.stringify(article.content),
      preview: { title: preview.title },
    };
    if (typeof preview.image === "string") {
      updatedArticle.preview.image = preview.image;
      updateArticle.mutate(updatedArticle);
    } else {
      const fr = new FileReader();
      fr.readAsDataURL(preview.image);
      fr.onload = () => {
        updatedArticle.preview.image = fr.result;
        updateArticle.mutate(updatedArticle);
      };
    }
  }

  function handleDeleteArticle() {
    deleteArticle.mutate();
  }

  function renderEditable() {
    switch (edit) {
      case Edit.ARTICLE:
        return (
          <Article
            title={article?.title}
            content={article?.content}
            onTitleChange={handleArticleTitleChange}
            onTextChange={handleArticleContentChange}
          />
        );
      case Edit.PREVIEW:
        return (
          <PreviewContainer>
            <EditableArticlePreview
              title={preview?.title}
              image={previewImageUrl || preview?.image}
              onImageChange={handlePreviewImageChanged}
              onTitleChange={handlePreviewTitleChange}
            />
          </PreviewContainer>
        );
      default:
        return null;
    }
  }

  function renderButton() {
    switch (edit) {
      case Edit.ARTICLE:
        return (
          <StyledAnimatedButton onClick={() => setEdit(Edit.PREVIEW)}>
            Редактировать превью
          </StyledAnimatedButton>
        );
      case Edit.PREVIEW:
        return (
          <StyledAnimatedButton onClick={() => setEdit(Edit.ARTICLE)}>
            Редактрировать статью
          </StyledAnimatedButton>
        );
      default:
        return null;
    }
  }

  return (
    <StyledEditArticlePage>
      <Poster
        title={
          <TitleContainer>
            {isLoading || (
              <>
                {renderButton()}
                <StyledAnimatedButton onClick={handleUpdateArticle}>
                  Сохранить
                </StyledAnimatedButton>
                <StyledAnimatedButton onClick={handleDeleteArticle}>
                  Удалить
                </StyledAnimatedButton>
              </>
            )}
          </TitleContainer>
        }
      >
        {isLoading ? "Загрузка..." : renderEditable()}
      </Poster>
    </StyledEditArticlePage>
  );
}

export default EditArticlePage;
