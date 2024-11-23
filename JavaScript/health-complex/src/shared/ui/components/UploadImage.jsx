import { useRef, useState } from "react";
import styled from "styled-components";

const StyledUploadImage = styled.div`
  height: 100%;
  width: 100%;
`;

const UploadPlug = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  border: 2px dashed;
  cursor: pointer;
`;

const ImageButton = styled.img`
  border: solid var(--color-red-2) 0.1rem;
  height: 100%;
  width: 100%;
  object-fit: cover;
  cursor: pointer;
  display: block;
`;

const Span = styled.span`
  display: inline-block;
`;

function UploadImage({ image, onChange = () => {} }) {
  const inputRef = useRef();
  const [localImage, setLocalImage] = useState();

  const ChangeEvent = {
    preventDefault() {
      this.isPreventRequested = true;
    },
    isPreventRequested: false,
    image: null,
    imageUrl: null,
  };

  function handleClickUpload() {
    inputRef.current.click();
  }

  function handleUpload() {
    const uploadedImage = inputRef.current.files[0];
    const cached = URL.createObjectURL(uploadedImage);
    ChangeEvent.image = uploadedImage;
    ChangeEvent.imageUrl = cached;
    onChange(ChangeEvent);
    if (!ChangeEvent.isPreventRequested) {
      URL.revokeObjectURL(localImage);
      setLocalImage(cached);
    }
  }

  return (
    <StyledUploadImage>
      {image || localImage ? (
        <ImageButton src={localImage || image} onClick={handleClickUpload} />
      ) : (
        <UploadPlug onClick={handleClickUpload}>
          <Span>Выберите</Span>
          <Span>изображение</Span>
        </UploadPlug>
      )}
      <input
        type="file"
        accept="image/*"
        hidden
        onChange={handleUpload}
        ref={inputRef}
      />
    </StyledUploadImage>
  );
}

export default UploadImage;
