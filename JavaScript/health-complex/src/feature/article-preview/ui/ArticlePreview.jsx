import { ArticlePreviewLayout } from "entities/article-preview";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Title = styled.span`
  text-align: center;
`;

function ArticlePreview({ image, title }) {
  return (
    <ArticlePreviewLayout>
      <Image src={image} />
      <Title>{title}</Title>
    </ArticlePreviewLayout>
  );
}

export default ArticlePreview;
