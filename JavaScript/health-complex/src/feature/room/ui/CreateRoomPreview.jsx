import { RoomPreviewLayout } from "entities/room";
import { useState } from "react";
import { UploadImage } from "shared/ui";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  gap: 1rem;
`;

const FormRow = styled.p`
  display: flex;
  gap: 2rem;
  justify-content: space-evenly;
`;

const Label = styled.label``;

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 0.2rem;
  display: inline-block;
  font-size: inherit;
  width: 2.5em;
  text-align: center;

  &:focus {
    outline: solid var(--color-red-2) 0.25rem;
  }
`;

function CreateRoomPreview({
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

  function handleRoomNumChange(e) {
    changeEvent.data = { ...changeEvent.data, roomNum: e.target.value };
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
      <UploadImage onChange={handleImageChange} defaultImage={defaultImage} />
      <Form>
        <FormRow>
          <Label htmlFor="roomNum">Номер комнаты:</Label>
          <Input
            id="roomNum"
            type="number"
            min="1"
            onChange={handleRoomNumChange}
            value={defaultRoomNum}
          />
        </FormRow>
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

export default CreateRoomPreview;
