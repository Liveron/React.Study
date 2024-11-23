import styled from "styled-components";

const StyledRoomPreviewLayout = styled.div`
  height: 100%;
  background-color: var(--color-white-2);
  padding: 0.2em;
  border-radius: 0.2rem;
`;

const Border = styled.div`
  height: 100%;
  border: solid 0.2rem var(--color-red-2);
  padding: 0.2em;
`;

const Content = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 70% auto;
  gap: 1rem;
`;

function RoomPreviewLayout({ children }) {
  return (
    <StyledRoomPreviewLayout>
      <Border>
        <Content>{children}</Content>
      </Border>
    </StyledRoomPreviewLayout>
  );
}

export default RoomPreviewLayout;
