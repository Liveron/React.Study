import styled from "styled-components";
import { AnimatedButton } from "..";
import Arrow from "../icons/Arrow";

const StyledArrowButton = styled(AnimatedButton)`
  svg {
    transform: rotate(${(props) => props.rotate + "deg"});
  }
`;

function ArrowButton({ rotate, onClick }) {
  return (
    <StyledArrowButton rotate={rotate} onClick={onClick}>
      <Arrow />
    </StyledArrowButton>
  );
}

export default ArrowButton;
