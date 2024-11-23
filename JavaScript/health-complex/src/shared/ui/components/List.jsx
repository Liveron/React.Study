import styled from "styled-components";

const StyledList = styled.ul`
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

function List({ children }) {
  return <StyledList>{children}</StyledList>;
}

export default List;
