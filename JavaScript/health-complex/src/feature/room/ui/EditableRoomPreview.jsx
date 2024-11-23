import { RoomPreviewLayout } from "entities/room";
import { UploadImage } from "shared/ui";
import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const FormRow = styled.p`
  display: flex;
  gap: 2rem;
`;

const Label = styled.label``;

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 0.2rem;
  font-size: inherit;
  width: 2.5em;
  text-align: center;

  &:focus {
    outline: solid var(--color-red-2) 0.25rem;
  }
`;

const RoomNum = styled.span``;

function EditableRoomPreview({
  onChange,
  defaultImage,
  defaultRoomNum,
  defaultPrice,
}) {
  const [data, setData] = useState();

  const changeEvent = {
    data,
  };

  function handlePriceChange(e) {
    changeEvent.data = { ...changeEvent.data, price: e.target.value };
    setData(changeEvent.data);
    onChange(changeEvent);
  }

  function handleImageChange(e) {
    changeEvent.data = { ...changeEvent.data, image: e.image };
    setData(changeEvent.data);
    onChange(changeEvent);
  }

  return (
    <RoomPreviewLayout>
      <UploadImage image={defaultImage} onChange={handleImageChange} />
      <Form>
        <RoomNum>Комната №{defaultRoomNum}</RoomNum>
        <FormRow>
          <Label htmlFor="price">Цена за ночь (₽):</Label>
          <Input
            id="price"
            type="number"
            min="1"
            step="any"
            onChange={handlePriceChange}
            value={defaultPrice}
          />
        </FormRow>
      </Form>
    </RoomPreviewLayout>
  );
}

export default EditableRoomPreview;
