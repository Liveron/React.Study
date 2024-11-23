import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledInfoButton = styled.div`
  font-size: 3rem;
  color: var(--color-yellow-1);
`;

function InfoButton() {
  return (
    <StyledInfoButton>
      <Link>Информация</Link>
    </StyledInfoButton>
  );
}

export default InfoButton;
