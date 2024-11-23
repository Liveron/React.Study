import { useNavigate } from "react-router-dom";
import { Poster } from "widgets/poster";
import { AnimatedLink, HorizontalArrowsContainer, List } from "shared/ui";
import { ArticlePreview } from "feature/article-preview";
import { useArticlePreviews } from "../lib/hooks";

import styled from "styled-components";

const StyledArticlesPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
`;

const CardContainer = styled.li`
  height: 70%;
  width: 22%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Defaults = {
  PAGE: 1,
  PAGE_SIZE: 3,
};

function ArticlesPage() {
  const {
    page,
    setPage,
    isLoading,
    isPlaceholderData,
    articlePreviews,
    metaData,
  } = useArticlePreviews(Defaults.PAGE, Defaults.PAGE_SIZE);

  const navigate = useNavigate();

  function handlePreviewClick(id) {
    navigate("edit/" + id);
  }

  function handlePrevClick() {
    if (page > 1) setPage((old) => old - 1);
  }

  function handleNextClick() {
    if (!isPlaceholderData) setPage((old) => old + 1);
  }

  if (isLoading) return "LOADING";

  return (
    <StyledArticlesPage>
      <Poster
        title={
          <Title>
            <AnimatedLink to={"edit"}>Создать статью</AnimatedLink>
          </Title>
        }
      >
        <HorizontalArrowsContainer
          showLeftArrow={page > 1}
          showRightArrow={metaData?.HasNext}
          onLeftArrowClick={handlePrevClick}
          onRightArrowClick={handleNextClick}
        >
          <List>
            {articlePreviews?.map((preview) => (
              <CardContainer
                key={preview.articleId}
                onClick={() => handlePreviewClick(preview.articleId)}
              >
                <ArticlePreview image={preview.image} title={preview.title} />
              </CardContainer>
            ))}
          </List>
        </HorizontalArrowsContainer>
      </Poster>
    </StyledArticlesPage>
  );
}

export default ArticlesPage;
