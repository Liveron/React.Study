import { useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  background-color: var(--color-white-2);
  padding: 0.4em;
`;

const Border = styled.div`
  height: 100%;
  border: solid 0.3rem var(--color-red-2);
  padding: 0.4em;
  gap: 0.6em;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const DateTime = styled.input`
  font-family: inherit;
  font-size: inherit;
  border: none;
  background-color: var(--color-red-2);
  font-weight: bold;
  color: var(--color-white-2);
  padding: 1rem;
  border-radius: 0.4rem;
`;

const Label = styled.label`
  font-family: "UssrStencil";
`;

const ErrorBorder = styled.div`
  border: solid var(--color-red-2) 0.3rem;
  border-style: dashed;
  padding: 0.2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.1em;
`;

const ErrorText = styled.span`
  font-size: 3rem;
`;

function DateTimeForm({
  children,
  onStartChange,
  onEndChange,
  defaultStart,
  defaultEnd,
}) {
  const [start, setStart] = useState(defaultStart);
  const [end, setEnd] = useState(defaultEnd);

  const isValid = start < end;

  function handleStartTimeChange(e) {
    const value = e.target.value;
    setStart(value);
    onStartChange(value);
  }

  function handleEndTimeChange(e) {
    const value = e.target.value;
    setEnd(value);
    onEndChange(value);
  }

  return (
    <Form>
      <Border>
        <Label>Дата заселения</Label>
        <DateTime type="date" value={start} onChange={handleStartTimeChange} />
        <Label>Дата выселения</Label>
        {isValid ? (
          <DateTime type="date" value={end} onChange={handleEndTimeChange} />
        ) : (
          <ErrorBorder>
            <DateTime
              type="date"
              value={end || ""}
              onChange={handleEndTimeChange}
            />
            <ErrorText>Дата выселения не должна</ErrorText>
            <ErrorText>быть раньше даты заселения!</ErrorText>
          </ErrorBorder>
        )}
        {children}
      </Border>
    </Form>
  );
}

export default DateTimeForm;
