import { ArticlePreviewLayout } from "entities/article-preview";
import { UploadImage } from "shared/ui";

import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  display: block;
  outline: none;
  border: none;
  background-color: transparent;
  text-align: center;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;

  &::placeholder {
    opacity: 1;
    transition: opacity 0.3s ease;
    color: inherit;
  }

  &:focus::placeholder {
    opacity: 0;
    transition: opacity 0.3s ease;
  }
`;

function EditableArticlePreview({
  title,
  image,
  onImageChange,
  onTitleChange,
}) {
  function handleTitleChange(e) {
    const title = e.target.value;
    onTitleChange(title);
  }

  return (
    <ArticlePreviewLayout>
      <UploadImage image={image} onChange={onImageChange} />
      <Input
        type="text"
        placeholder="Введите что-нибудь..."
        value={title}
        onChange={handleTitleChange}
      />
    </ArticlePreviewLayout>
  );
}

export default EditableArticlePreview;
