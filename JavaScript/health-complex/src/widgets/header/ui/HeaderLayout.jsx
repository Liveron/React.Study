import styled from "styled-components";

const StyledHeaderLayout = styled.header`
  background-color: var(--color-red-2);
  font-family: "UssrStencil";
  border-bottom: 1px solid var(--color-black-1);
`;

const Navigation = styled.nav`
  padding: 0.6rem;
  color: var(--color-white-1);
`;

const NavigationList = styled.ul`
  font-size: 2.5em;
  list-style: none;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 2fr 1fr;
`;

const NavigationListItem = styled.li``;

function HeaderLayout({ left, center, right }) {
  return (
    <StyledHeaderLayout>
      <Navigation>
        <NavigationList>
          <NavigationListItem>{left}</NavigationListItem>
          <NavigationListItem>{center}</NavigationListItem>
          <NavigationListItem>{right}</NavigationListItem>
        </NavigationList>
      </Navigation>
    </StyledHeaderLayout>
  );
}

export default HeaderLayout;
