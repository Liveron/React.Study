import { useOrderContext } from "feature/order/context/OrderContext";
import { AnimatedButton } from "shared/ui";
import styled from "styled-components";

const StyledConfirmOrderForm = styled.div`
  background-color: var(--color-white-2);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  padding-top: 1rem;
  gap: 1rem;
  border: solid 0.4rem var(--color-red-2);
`;

const Title = styled.span`
  color: var(--color-red-2);
  margin-bottom: 1.5rem;
`;

const Content = styled.span`
  font-family: "PobedaRegular";
  font-weight: bold;
  color: var(--color-red-2);
`;

const OrderButton = styled(AnimatedButton)`
  color: var(--color-yellow-1);
  background-color: var(--color-red-2);
  padding: 0.5rem 1rem;
  border-radius: 0.3rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin-top: 1.5rem;
  width: 100%;
  gap: 3rem;
`;

function getDaysBetween(start, end) {
  return (new Date(end) - new Date(start)) / (1000 * 3600 * 24);
}

function ConfirmOrderForm({ onSubmit }) {
  const { order, setShowForm } = useOrderContext();

  return (
    <StyledConfirmOrderForm>
      <Title>Подтверждение</Title>
      <Content>Выбрана комната номер {order?.roomId}</Content>
      <Content>
        Даты проживания: с <b>{order?.start}</b> по {order?.end}
      </Content>
      <Content>
        Общая сумма составит{" "}
        {order?.price * getDaysBetween(order?.start, order?.end)} ₽
      </Content>
      <Container>
        <AnimatedButton onClick={() => setShowForm(false)}>
          Отменить
        </AnimatedButton>
        <OrderButton onClick={onSubmit}>Заказать</OrderButton>
      </Container>
    </StyledConfirmOrderForm>
  );
}

export default ConfirmOrderForm;
