import { CreateRoomPreview } from "feature/room";
import { Poster } from "widgets/poster";
import { useState } from "react";
import { useCreateRoom } from "../api/hooks";
import { useNavigate } from "react-router-dom";
import { AnimatedButton } from "shared/ui";

import styled from "styled-components";

const StyledCreateRoomPage = styled.div`
  height: 100%;
  padding: 2rem;
  font-size: 5rem;
  font-weight: bold;
  font-family: "PobedaRegular";

  @media (max-width: 1600px) {
    font-size: 3.5rem;
  }
`;

const CardContainer = styled.div`
  height: 12em;
  width: 35%;
`;

const SaveRoomButton = styled(AnimatedButton)``;

function CreateRoomPage() {
  const [data, setData] = useState({});
  const createRoom = useCreateRoom(handleCreateRoomSuccess);
  const navigate = useNavigate();

  function handleRoomChange(e) {
    setData(e.data);
  }

  function handleSaveRoom() {
    const fr = new FileReader();
    fr.readAsDataURL(data.image);
    fr.onload = () =>
      createRoom.mutate({
        id: data.roomNum,
        price: data.price,
        image: fr.result,
      });
  }

  function handleCreateRoomSuccess() {
    navigate("/admin/rooms");
  }

  return (
    <StyledCreateRoomPage>
      <Poster
        title={
          <SaveRoomButton onClick={handleSaveRoom}>Сохранить</SaveRoomButton>
        }
      >
        <CardContainer>
          <CreateRoomPreview onChange={handleRoomChange} />
        </CardContainer>
      </Poster>
    </StyledCreateRoomPage>
  );
}

export default CreateRoomPage;
