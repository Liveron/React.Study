import { format } from "date-fns";
import { useState } from "react";
import { AnimatedButton, Bin, Save } from "shared/ui";
import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  text-indent: 1rem;
  outline: none;
  background-color: transparent;
  text-align: center;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-overflow: ellipsis;
  border: none;
  padding-left: 2px;
  padding-top: 2px;
  border-right: 2px solid var(--color-red-2);
  border-bottom: 2px solid var(--color-red-2);
`;

const Button = styled(AnimatedButton)`
  height: 1em;
  padding: 0.5rem;
`;

const ButtonsContainer = styled.ul`
  display: flex;
  padding-left: 2px;
  padding-top: 2px;
  border-right: 2px solid var(--color-red-2);
  border-bottom: 2px solid var(--color-red-2);
`;

function OrderPreview({ order, onDelete, onSave, onChange }) {
  const [localOrder, setLocalOrder] = useState();

  const { id, start, end, roomId, userName } = order;

  function handleStartDateChange(e) {
    const newOrder = { ...order, start: e.target.value };
    setLocalOrder(newOrder);
    onChange(newOrder);
  }

  function handleEndDateChange(e) {
    const newOrder = { ...order, end: e.target.value };
    setLocalOrder(newOrder);
    onChange(newOrder);
  }

  function handleRoomNumChange(e) {
    const newOrder = { ...order, roomId: e.target.value };
    setLocalOrder(newOrder);
    onChange(newOrder);
  }

  function handleUserNameChange(e) {
    const newOrder = { ...order, userName: e.target.value };
    setLocalOrder(newOrder);
    onChange(newOrder);
  }

  return (
    <>
      <Input value={id} readOnly />
      <Input
        type="date"
        value={localOrder?.start || format(start, "yyyy-MM-dd")}
        onChange={handleStartDateChange}
      />
      <Input
        type="date"
        value={localOrder?.end || format(end, "yyyy-MM-dd")}
        onChange={handleEndDateChange}
      />
      <Input
        type="number"
        value={localOrder?.roomId || roomId}
        onChange={handleRoomNumChange}
      />
      <Input
        value={localOrder?.userName || userName}
        onChange={handleUserNameChange}
      />
      <ButtonsContainer>
        {localOrder && (
          <Button onClick={onSave}>
            <Save />
          </Button>
        )}
        <Button onClick={onDelete}>
          <Bin />
        </Button>
      </ButtonsContainer>
    </>
  );
}

export default OrderPreview;
