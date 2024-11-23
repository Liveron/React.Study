import styled from "styled-components";

const Background = styled.div`
  background-color: wheat;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
  font-size: 3rem;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`;

function Test() {
  return (
    <Background>
      <Container></Container>
    </Background>
  );
}

export default Test;
