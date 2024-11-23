import { Poster } from "widgets/poster";
import { HorizontalArrowsContainer, List } from "shared/ui";
import { useArticlePreviews } from "../api/hooks";
import { ArticlePreview } from "feature/article-preview";

import styled from "styled-components";

const StyledMainPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-family: "PobedaRegular";
  font-weight: bold;

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
`;

const CardContainer = styled.li`
  height: 70%;
  width: 20%;
  cursor: pointer;
  transition: 0.2s transform;

  &:hover {
    transform: scale(1.1);
  }
`;

const Defaults = {
  PAGE: 1,
  PAGE_SIZE: 3,
};

function MainPage() {
  const {
    isPlaceholderData,
    isLoading,
    articlePreviews,
    metaData,
    page,
    setPage,
  } = useArticlePreviews(Defaults.PAGE, Defaults.PAGE_SIZE);

  function handlePrevClick() {
    if (page > 1) setPage((old) => old - 1);
  }

  function handleNextClick() {
    if (!isPlaceholderData) setPage((old) => old + 1);
  }

  if (isLoading) return "LOADING";

  return (
    <StyledMainPage>
      <Poster title={<Title>Статьи</Title>}>
        <HorizontalArrowsContainer
          showLeftArrow={page > 1}
          showRightArrow={metaData?.HasNext}
          onLeftArrowClick={handlePrevClick}
          onRightArrowClick={handleNextClick}
        >
          <List>
            {articlePreviews?.map((preview) => (
              <CardContainer key={preview.articleId}>
                <ArticlePreview image={preview.image} title={preview.title} />
              </CardContainer>
            ))}
          </List>
        </HorizontalArrowsContainer>
      </Poster>
    </StyledMainPage>
  );
}

export default MainPage;
