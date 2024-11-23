import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const StyledSideBarLink = styled(Link)`
  padding: 6px;
  font-size: 2.5rem;
  transition: transform 0.2s;

  outline: ${(props) => props.clicked && "solid 0.3rem var(--color-yellow-1)"};

  &:hover {
    transform: ${(props) => props.clicked || "scale(1.1)"};
  }
`;

function SideBarLink({ name, to }) {
  const location = useLocation();
  const isClicked = location.pathname.includes(to);
  return (
    <StyledSideBarLink clicked={isClicked} to={to}>
      {name}
    </StyledSideBarLink>
  );
}

export default SideBarLink;
