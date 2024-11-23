import styled from "styled-components";
import Icon from "shared/ui/icons/Icon";

const StyledTitle = styled.h1`
  font-size: inherit;
  display: flex;
  gap: 1rem;
  align-items: center;
  font-weight: normal;
  cursor: pointer;
`;

const EndAlignedText = styled.span`
  justify-self: end;
  text-align: right;
`;

const StartAlignedText = styled.span`
  justify-self: start;
  font-size: 2.1em;
`;

const StyledIcon = styled(Icon)`
  height: 2.2em;
`;

function Title({
  leftText = (
    <>
      {"Оздоровительный"}
      <br />
      {"Комплекс"}
    </>
  ),
  rightText = "Наследие",
  onClick,
}) {
  return (
    <StyledTitle onClick={onClick}>
      <EndAlignedText>{leftText}</EndAlignedText>
      <StyledIcon />
      <StartAlignedText>{rightText}</StartAlignedText>
    </StyledTitle>
  );
}

export default Title;
