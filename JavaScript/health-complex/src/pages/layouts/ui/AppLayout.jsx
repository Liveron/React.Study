import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { Header } from "widgets/header";

const StyledAppLayout = styled.div`
  height: 100dvh;
  max-height: 100dvh;
  display: flex;
  flex-direction: column;
`;

const Background = styled.div`
  height: 100%;
  display: flex;
  background-image: url("/src/shared/ui/images/brown-paper.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.main`
  width: 100%;
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Background>
        <Main>
          <Outlet />
        </Main>
      </Background>
    </StyledAppLayout>
  );
}

export default AppLayout;
