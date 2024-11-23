import RegAuth from "./RegAuth";
import styled from "styled-components";

const StyledAuthBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
`;

function AuthBackground({ onClick }) {
  return (
    <StyledAuthBackground onClick={onClick}>
      <RegAuth />
    </StyledAuthBackground>
  );
}

export default AuthBackground;
