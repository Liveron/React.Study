import Lenin from "shared/ui/icons/Lenin";
import SideBarLink from "./SideBarLink";
import styled from "styled-components";

const StyledSideBar = styled.aside`
  background-color: var(--color-red-2);
  border-right: 1px solid var(--color-black-1);
  border-top: 1px solid var(--color-black-1);
  color: white;
`;

const LeninContainer = styled.div`
  padding: 0.6em;
  display: flex;
  justify-content: center;
`;

const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5em;
  gap: 1.5em;
`;

function SideBar() {
  return (
    <StyledSideBar>
      <LeninContainer>
        <Lenin />
      </LeninContainer>
      <Navigation>
        <SideBarLink to={"articles"} name={"Статьи"} />
        <SideBarLink to={"rooms"} name={"Комнаты"} />
        <SideBarLink to={"orders"} name={"Заказы"} />
      </Navigation>
    </StyledSideBar>
  );
}

export default SideBar;
