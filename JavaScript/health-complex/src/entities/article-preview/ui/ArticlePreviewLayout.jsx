import styled from "styled-components";

const StyledArticlePreviewLayout = styled.div`
  height: 100%;
  /* padding: 1.1rem; */
  padding: 0.2em;
  background-color: var(--color-white-2);
`;

const Border = styled.div`
  height: 100%;
  border-style: solid;
  border-color: var(--color-red-1);
  border-width: 0.2rem;
  padding: 0.2em;
`;

const Content = styled.div`
  height: 100%;
  display: grid;
  gap: 1rem;
  grid-template-rows: 85% auto;
`;

function ArticlePreviewLayout({ children }) {
  return (
    <StyledArticlePreviewLayout>
      <Border>
        <Content>{children}</Content>
      </Border>
    </StyledArticlePreviewLayout>
  );
}

export default ArticlePreviewLayout;
