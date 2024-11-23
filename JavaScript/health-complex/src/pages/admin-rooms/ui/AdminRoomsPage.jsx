import styled from "styled-components";
import { Poster } from "widgets/poster";
import { useRooms } from "../api/hooks";
import RoomPreview from "feature/room/ui/RoomPreview";
import { useNavigate } from "react-router-dom";
import { AnimatedLink, HorizontalArrowsContainer, List } from "shared/ui";

const StyledAdminRoomsPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
`;

const Container = styled.li`
  height: 70%;
  width: 22%;
  cursor: pointer;
  transition: 0.2s transform;

  &:hover {
    transform: scale(1.1);
  }
`;

function AdminRoomsPage() {
  const {
    rooms,
    metaData,
    isPending,
    isError,
    isPlaceholderData,
    page,
    setPage,
  } = useRooms(1, 3);
  const navigate = useNavigate();

  function handleRoomClick(id) {
    navigate("edit/" + id);
  }

  function handlePrevClick() {
    if (page > 1) setPage((old) => old - 1);
  }

  function handleNextClick() {
    if (!isPlaceholderData) setPage((old) => old + 1);
  }

  if (isError) return "ERROR";
  if (isPending) return "LOADING";

  return (
    <StyledAdminRoomsPage>
      <Poster
        title={
          <Title>
            <AnimatedLink to={"edit"}>Создать комнату</AnimatedLink>
          </Title>
        }
      >
        <HorizontalArrowsContainer
          showLeftArrow={page > 1}
          showRightArrow={metaData?.HasNext}
          onLeftArrowClick={handlePrevClick}
          onRightArrowClick={handleNextClick}
        >
          <List>
            {rooms?.map((room) => (
              <Container key={room.id} onClick={() => handleRoomClick(room.id)}>
                <RoomPreview
                  image={room.image}
                  roomNum={room.id}
                  price={room.price}
                />
              </Container>
            ))}
          </List>
        </HorizontalArrowsContainer>
      </Poster>
    </StyledAdminRoomsPage>
  );
}

export default AdminRoomsPage;
