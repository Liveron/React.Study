import { RoomPreviewLayout } from "entities/room";
import styled from "styled-components";

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
`;

const RoomNum = styled.span``;

const PriceNum = styled.span``;

function RoomPreview({ image, roomNum, price }) {
  return (
    <RoomPreviewLayout>
      <Image src={image} />
      <Container>
        <RoomNum>Комната №{roomNum}</RoomNum>
        <PriceNum>{price} р.</PriceNum>
      </Container>
    </RoomPreviewLayout>
  );
}

export default RoomPreview;
