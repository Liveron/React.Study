import styled from "styled-components";
import { Poster } from "widgets/poster";
import RoomPreview from "feature/room/ui/RoomPreview";
import { useOrderContext } from "feature/order";
import toast from "react-hot-toast";
import { HorizontalArrowsContainer, List } from "shared/ui";
import { useRooms } from "../api/hooks";

const StyledOrderRoomPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-family: "PobedaRegular";
  font-weight: bold;

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
`;

const CardContainer = styled.li`
  /* height: 45rem;
  width: 35rem; */
  height: 70%;
  width: 20%;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Defaults = {
  PAGE: 1,
  PAGE_SIZE: 3,
};

function OrderRoomPage() {
  const { rooms, metaData, isLoading, isPlaceholderData, page, setPage } =
    useRooms(Defaults.PAGE, Defaults.PAGE_SIZE);
  const { order, setShowForm, setOrder } = useOrderContext();

  function handlePrevClick() {
    if (page > 1) setPage((old) => old - 1);
  }

  function handleNextClick() {
    if (!isPlaceholderData) setPage((old) => old + 1);
  }

  function handleRoomClick(room) {
    if (!order?.start || !order?.end) {
      toast.error("Выберите даты проживания!");
      return;
    }
    setOrder((order) => ({
      ...order,
      roomId: room.id,
      price: room.price,
    }));
    setShowForm(true);
  }

  if (isLoading) return "LOADING";

  return (
    <StyledOrderRoomPage>
      <Poster title={<Title>Комнаты проживания</Title>}>
        <HorizontalArrowsContainer
          showLeftArrow={page > 1}
          showRightArrow={metaData?.HasNext}
          onLeftArrowClick={handlePrevClick}
          onRightArrowClick={handleNextClick}
        >
          <List>
            {rooms?.map((room) => (
              <CardContainer
                key={room.id}
                onClick={() => handleRoomClick(room)}
              >
                <RoomPreview
                  image={room.image}
                  roomNum={room.id}
                  price={room.price}
                />
              </CardContainer>
            ))}
          </List>
        </HorizontalArrowsContainer>
      </Poster>
    </StyledOrderRoomPage>
  );
}

export default OrderRoomPage;
