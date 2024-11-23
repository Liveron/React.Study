import { Outlet } from "react-router-dom";
import { AdminHeader } from "widgets/header";
import { SideBar } from "widgets/sidebar";

import styled from "styled-components";

const StyledAdminLayout = styled.div`
  height: 100dvh;
  max-height: 100dvh;
  display: flex;
  overflow: hidden;
`;

const Background = styled.div`
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  background-image: url("/src/shared/ui/images/brown-paper.jpg");
  background-size: cover;
  background-repeat: no-repeat;
`;

const Main = styled.main`
  height: 100%;
`;

function AdminLayout() {
  return (
    <StyledAdminLayout>
      <SideBar />
      <Background>
        <AdminHeader />
        <Main>
          <Outlet />
        </Main>
      </Background>
    </StyledAdminLayout>
  );
}

export default AdminLayout;
