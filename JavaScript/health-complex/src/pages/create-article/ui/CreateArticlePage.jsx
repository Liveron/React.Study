import { EditableArticlePreview } from "feature/article-preview";
import { Article } from "feature/article";
import { Poster } from "widgets/poster";
import { AnimatedButton } from "shared/ui";
import { useCreateArticle } from "../lib/hooks";
import { useState } from "react";

import styled from "styled-components";

const StyledCreateArticlePage = styled.div`
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

function CreateArticlePage() {
  const {
    article,
    setArticle,
    articlePreview,
    setArticlePreview,
    previewImageUrl,
    setPreviewImageUrl,
    createArticle,
  } = useCreateArticle();
  const [edit, setEdit] = useState(Edit.PREVIEW);

  function handlePreviewTitleChange(title) {
    setArticlePreview((preview) => ({ ...preview, title }));
  }

  function handlePreviewImageChange(e) {
    e.preventDefault();
    URL.revokeObjectURL(previewImageUrl);
    setArticlePreview((preview) => ({ ...preview, image: e.image }));
    setPreviewImageUrl(e.imageUrl);
  }

  function handleArticleContentChange(content) {
    setArticle((article) => ({ ...article, content }));
  }

  function handleArticleTitleChange(title) {
    setArticle((article) => ({ ...article, title }));
  }

  function handleSaveArticle() {
    const fr = new FileReader();
    fr.readAsDataURL(articlePreview.image);
    console.log(article.content);
    fr.onload = () => {
      createArticle.mutate({
        ...article,
        content: JSON.stringify(article.content),
        preview: { ...articlePreview, image: fr.result },
      });
    };
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
              defaultTitle={articlePreview?.title}
              image={previewImageUrl}
              onTitleChange={handlePreviewTitleChange}
              onImageChange={handlePreviewImageChange}
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
            Редактировать статью
          </StyledAnimatedButton>
        );
      default:
        return null;
    }
  }

  return (
    <StyledCreateArticlePage>
      <Poster
        title={
          <TitleContainer>
            {renderButton()}
            <StyledAnimatedButton onClick={handleSaveArticle}>
              Сохранить
            </StyledAnimatedButton>
          </TitleContainer>
        }
      >
        {renderEditable()}
      </Poster>
    </StyledCreateArticlePage>
  );
}

export default CreateArticlePage;
