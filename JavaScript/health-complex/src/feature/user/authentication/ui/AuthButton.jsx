import styled from "styled-components";

const StyledAuthButton = styled.button`
  border-radius: 0.5rem;
  padding: 0.5rem 1.2rem;
  background-color: var(--color-red-2);
  color: var(--color-yellow-1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`;

function AuthButton({ children, onClick }) {
  return <StyledAuthButton onClick={onClick}>{children}</StyledAuthButton>;
}

export default AuthButton;
