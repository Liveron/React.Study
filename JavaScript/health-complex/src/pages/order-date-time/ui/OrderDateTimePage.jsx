import { useOrderContext } from "feature/order";
import DateTimeForm from "feature/order/ui/DateTimeForm";
import { Poster } from "widgets/poster";
import { AnimatedLink } from "shared/ui";

import styled from "styled-components";

const StyledOrderDateTimePage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  font-family: "PobedaRegular";
  font-weight: bold;
`;

const ChooseRoomLink = styled(AnimatedLink)`
  margin: 0.5em;
  background-color: var(--color-red-2);
  color: var(--color-yellow-1);
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`;

function OrderDateTimePage() {
  const { order, setOrder } = useOrderContext();

  function handleStartChange(value) {
    setOrder((order) => ({ ...order, start: value }));
  }

  function handleEndChange(value) {
    setOrder((order) => ({ ...order, end: value }));
  }

  return (
    <StyledOrderDateTimePage>
      <Poster title={<Title>Даты проживания</Title>}>
        <DateTimeForm
          onStartChange={handleStartChange}
          onEndChange={handleEndChange}
          defaultStart={order?.start}
          defaultEnd={order?.end}
        >
          <ChooseRoomLink to={"/order/room"}>Выбрать комнату</ChooseRoomLink>
        </DateTimeForm>
      </Poster>
    </StyledOrderDateTimePage>
  );
}

export default OrderDateTimePage;
