import Star from "shared/ui/icons/Star";
import styled from "styled-components";

const StyledPoster = styled.div`
  height: 100%;
  max-height: 100%;
  background-image: url("/src/shared/ui/images/gazeta.jpg");
  background-size: cover;
  display: grid;
  grid-template-columns: 5% 1fr 5%;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
  align-items: center;
  color: var(--color-red-2);
  min-height: 0;
  min-width: 0;
`;

const HorizontalLine = styled.div`
  height: 100%;
  width: 0.5rem;
  background-color: var(--color-red-1);
`;

const VerticalLine = styled.div`
  height: 0.5rem;
  width: 100%;
  background-color: var(--color-red-1);
`;

function Poster({ children, title = <div /> }) {
  return (
    <StyledPoster>
      <Star />
      {title}
      <Star />
      <HorizontalLine />
      {children}
      <HorizontalLine />
      <Star />
      <VerticalLine />
      <Star />
    </StyledPoster>
  );
}

export default Poster;
