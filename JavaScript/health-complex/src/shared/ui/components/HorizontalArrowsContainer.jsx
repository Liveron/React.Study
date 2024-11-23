import styled from "styled-components";
import { ArrowButton } from "..";

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: auto 98% auto;
  justify-items: center;
  align-items: center;
`;

const CenterElement = styled.div`
  width: 100%;
  height: 100%;
  grid-column: 2;
`;

function HorizontalArrowsContainer({
  showLeftArrow,
  showRightArrow,
  onLeftArrowClick,
  onRightArrowClick,
  children,
}) {
  return (
    <Container>
      {showLeftArrow && <ArrowButton rotate={180} onClick={onLeftArrowClick} />}
      <CenterElement>{children}</CenterElement>
      {showRightArrow && <ArrowButton onClick={onRightArrowClick} />}
    </Container>
  );
}

export default HorizontalArrowsContainer;
