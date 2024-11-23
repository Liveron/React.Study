import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Row = styled.p`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  gap: 2rem;
  align-items: center;
`;

const Label = styled.label`
  justify-self: right;
`;

const Input = styled.input`
  outline: none;
  border: none;
  border-radius: 0.2rem;
  margin-top: 0.4rem;
  display: inline-block;
  font-size: 2rem;
  padding-left: 0.4rem;

  &:focus {
    outline: solid var(--color-red-2) 0.25rem;
  }
`;

function SignInForm({ reference }) {
  return (
    <Form ref={reference}>
      <Row>
        <Label htmlFor="username">Имя пользователя:</Label>
        <Input id="username" type="text" name="username" />
      </Row>
      <Row>
        <Label htmlFor="password">Пароль:</Label>
        <Input id="password" type="password" name="password" />
      </Row>
    </Form>
  );
}

export default SignInForm;
