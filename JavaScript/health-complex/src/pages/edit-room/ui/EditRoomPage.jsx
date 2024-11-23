import { EditableRoomPreview } from "feature/room";
import styled from "styled-components";
import { Poster } from "widgets/poster";
import { useRoom } from "../api/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { AnimatedButton } from "shared/ui";
import { useDeleteRoom, useUpdateRoom } from "feature/room/api/hooks";

const StyledEditRoomPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-evenly;
`;

const Container = styled.div`
  height: 12em;
  width: 35%;
`;

function EditRoomPage() {
  const { id } = useParams();
  const [room, setRoom, isLoading] = useRoom(id);
  const deleteMutation = useDeleteRoom(handleDeleteSuccess);
  const updateMutation = useUpdateRoom(handleUpdateRoomSuccess);
  const navigate = useNavigate();

  function handleDeleteRoom() {
    deleteMutation.mutate(id);
  }

  function handleUpdateRoom() {
    const fr = new FileReader();
    fr.readAsDataURL(room.image);
    fr.onload = () =>
      updateMutation.mutate({
        id: room.id,
        room: { image: fr.result, price: room.price },
      });
  }

  async function handleUpdateRoomSuccess() {
    navigate("/admin/rooms");
  }

  function handleDeleteSuccess() {
    navigate("/admin/rooms");
  }

  function handleChangeRoom(e) {
    setRoom((old) => ({ ...old, ...e.data }));
  }

  if (isLoading) return "LOADING";

  return (
    <StyledEditRoomPage>
      <Poster
        title={
          <TitleContainer>
            <AnimatedButton onClick={handleUpdateRoom}>
              Сохранить
            </AnimatedButton>
            <AnimatedButton onClick={handleDeleteRoom}>Удалить</AnimatedButton>
          </TitleContainer>
        }
      >
        <Container>
          <EditableRoomPreview
            onChange={handleChangeRoom}
            defaultImage={room?.image}
            defaultPrice={room?.price}
            defaultRoomNum={room?.id}
          />
        </Container>
      </Poster>
    </StyledEditRoomPage>
  );
}

export default EditRoomPage;
