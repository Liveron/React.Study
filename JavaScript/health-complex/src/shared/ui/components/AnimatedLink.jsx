import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledAnimatedLink = styled(Link)`
  display: inline-block;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

function AnimatedLink({ children, className, to }) {
  return (
    <StyledAnimatedLink className={className} to={to}>
      {children}
    </StyledAnimatedLink>
  );
}

export default AnimatedLink;
