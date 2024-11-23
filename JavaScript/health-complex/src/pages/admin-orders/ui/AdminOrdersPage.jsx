import { useDeleteOrder, useUpdateOrder, OrderPreview } from "feature/order";
import { ArrowButton } from "shared/ui";
import { Poster } from "widgets/poster";
import { useOrders } from "../lib/hooks";

import styled from "styled-components";

const StyledAdminOrdersPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const ArrowListContainer = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  align-items: start;
  justify-items: center;
`;

const ArrowConstraits = styled.div`
  visibility: ${(props) => (props.$hidden ? "hidden" : "visible")};
  width: 1.5%;
  grid-row: 1;
`;

const NextArrowConstraits = styled.div`
  grid-row: 3;
  width: 1.5%;
`;

const OrdersGrid = styled.ul`
  width: 100%;
  background-color: var(--color-white-2);
  display: grid;
  grid-template-columns: auto auto auto 10% auto auto;
  border-top: 2px solid var(--color-red-2);
  border-left: 2px solid var(--color-red-2);
  grid-row: 2;
  margin-top: 0.4em;
`;

const Defaults = {
  PAGE_NUMBER: 1,
  PAGE_SIZE: 10,
};

function AdminOrdersPage() {
  const {
    orders,
    setOrders,
    metaData,
    page,
    setPage,
    isLoading,
    isPlaceholderData,
  } = useOrders(Defaults.PAGE_NUMBER, Defaults.PAGE_SIZE);

  const deleteMutation = useDeleteOrder();
  const updateMutation = useUpdateOrder();

  function handlePrevClick() {
    if (page > 1) setPage((old) => old - 1);
  }

  function handleNextClick() {
    if (!isPlaceholderData) setPage((old) => old + 1);
  }

  function handleDelete(id) {
    deleteMutation.mutate(id);
  }

  function handleUpdate(order) {
    const orderDto = { ...order };
    delete orderDto.id;
    updateMutation.mutate({ id: order.id, order: orderDto });
  }

  function handleChangeOrder(order) {
    setOrders((old) =>
      old.map((o) => (o.id === order.id ? { ...o, ...order } : o))
    );
  }

  if (isLoading) return "LOADING!";

  return (
    <StyledAdminOrdersPage>
      <Poster title={"Заказы"}>
        <ArrowListContainer>
          <ArrowConstraits $hidden={page == 1}>
            <ArrowButton rotate={270} onClick={handlePrevClick} />
          </ArrowConstraits>
          {orders?.length > 0 && (
            <OrdersGrid>
              {orders.map((order) => (
                <OrderPreview
                  key={order.id}
                  order={order}
                  onDelete={() => handleDelete(order.id)}
                  onSave={() => handleUpdate(order)}
                  onChange={handleChangeOrder}
                />
              ))}
            </OrdersGrid>
          )}
          {metaData?.HasNext && (
            <NextArrowConstraits>
              <ArrowButton rotate={90} onClick={handleNextClick} />
            </NextArrowConstraits>
          )}
        </ArrowListContainer>
      </Poster>
    </StyledAdminOrdersPage>
  );
}

export default AdminOrdersPage;
