import styled from "styled-components";

const Button = styled.button`
  background-color: transparent;
  cursor: pointer;
  transition: transform 0.2s;
  color: var(--color-red-2);
  font-weight: inherit;

  &:hover {
    transform: scale(1.1);
  }
`;

function AnimatedButton({ onClick, children, className }) {
  return (
    <Button onClick={onClick} className={className}>
      {children}
    </Button>
  );
}

export default AnimatedButton;
