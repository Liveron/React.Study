import RegistrationForm from "feature/user/authentication/ui/RegistrationForm";
import AuthButton from "./AuthButton";
import { useState } from "react";
import SignInForm from "./SignInForm";
import { useRef } from "react";
import { useLoginUser, useRegisterUser } from "../api/hooks";
import { useAuthContext } from "../context/AuthContext";
import { saveTokens } from "shared/model/tokenHelpers";

import styled from "styled-components";

const StyledRegAuth = styled.div`
  border-radius: 1%;
  display: grid;
  grid-template-columns: auto;
  border: solid 0.3rem var(--color-red-2);
  background-color: var(--color-white-2);
`;

const Title = styled.div`
  color: var(--color-yellow-1);
  text-align: center;
  background-color: var(--color-red-2);
  padding: 1rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 1.5rem;
  color: var(--color-red-2);
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  gap: 1.5rem;
`;

const SwitchButton = styled.button`
  border-radius: 0.4rem;
  border: solid 0.3rem var(--color-red-2);
  padding: 0.5rem 1.2rem;
  color: var(--color-red-2);
  background-color: transparent;
  cursor: pointer;

  &:hover {
    background-color: white;
  }
`;

function RegAuth() {
  const [regAuth, setRegAuth] = useState("Регистрация");
  const registerUser = useRegisterUser(handleRegisterSuccess);
  const loginUser = useLoginUser(handleLoginSuccess);
  const { setIsAuth, disableForm } = useAuthContext();
  const formRef = useRef();

  function handleRegister(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const user = {
      firstName: formData.get("name"),
      lastName: formData.get("lastname"),
      userName: formData.get("username"),
      password: formData.get("password"),
      email: formData.get("email"),
    };

    registerUser.mutate(user);
  }

  function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const user = {
      userName: formData.get("username"),
      password: formData.get("password"),
    };

    loginUser.mutate(user);
  }

  function handleRegisterSuccess() {
    regAuth === "Регистрация" ? setRegAuth("Вход") : setRegAuth("Регистрация");
  }

  function handleLoginSuccess(response) {
    saveTokens(response.data);
    setIsAuth(true);
    disableForm();
  }

  function hanleSwitch() {
    regAuth === "Регистрация" ? setRegAuth("Вход") : setRegAuth("Регистрация");
  }

  return (
    <StyledRegAuth onClick={(e) => e.stopPropagation()}>
      <Title>{regAuth}</Title>
      <Container>
        {regAuth === "Регистрация" ? (
          <RegistrationForm reference={formRef} />
        ) : (
          <SignInForm reference={formRef} />
        )}
        <ButtonsContainer>
          {regAuth === "Регистрация" ? (
            <AuthButton onClick={handleRegister}>Зарегистрироваться</AuthButton>
          ) : (
            <AuthButton onClick={handleSignIn}>Войти</AuthButton>
          )}
          <SwitchButton onClick={hanleSwitch}>
            {regAuth == "Регистрация" ? "Уже есть аккаунт?" : "Регистрация"}
          </SwitchButton>
        </ButtonsContainer>
      </Container>
    </StyledRegAuth>
  );
}

export default RegAuth;
