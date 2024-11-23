import { ConfirmOrderForm, useOrderContext } from "feature/order";
import { useCreateOrder } from "feature/order/api/hooks";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const StyledConfirmOrderPage = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
`;

function ConfirmOrderPage() {
  const { order } = useOrderContext();
  const createOrderMutation = useCreateOrder(handleCreateOrderSuccess);
  const navigate = useNavigate();

  function handleCreateOrderSuccess() {
    navigate("/");
  }

  function handleSubmit() {
    createOrderMutation.mutate({
      ...order,
      start: new Date(order.start),
      end: new Date(order.end),
    });
  }

  return (
    <StyledConfirmOrderPage>
      <ConfirmOrderForm onSubmit={handleSubmit} />
    </StyledConfirmOrderPage>
  );
}

export default ConfirmOrderPage;
