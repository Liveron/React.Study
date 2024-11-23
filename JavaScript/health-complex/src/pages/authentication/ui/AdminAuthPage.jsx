import SignInForm from "feature/user/authentication/ui/SignInForm";
import { AdminHeader } from "widgets/header";
import { useRef } from "react";
import { checkAdminRole, useAdminAuthContext } from "feature/user";
import { useLoginUser } from "feature/user";
import { saveTokens } from "shared/model";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";

const StyledAdminAuthPage = styled.div`
  height: 100dvh;
  background-color: var(--color-red-2);
  display: grid;
  font-size: 1.5rem;
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
`;

const AdminSignIn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 3rem;
  color: white;
  gap: 2rem;
`;

const LoginButton = styled.button`
  font-size: 3.5rem;
  padding: 1rem 3rem;
  background-color: var(--color-yellow-1);
  color: var(--color-red-2);
  border-radius: 0.3rem;
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;

function AdminAuthPage() {
  const { isAdminAuth, setIsAdminAuth } = useAdminAuthContext();
  const formRef = useRef();
  const login = useLoginUser(handleLoginSuccess);
  const navigate = useNavigate();

  function handleSignIn(e) {
    e.preventDefault();
    const formData = new FormData(formRef.current);

    const user = {
      userName: formData.get("username"),
      password: formData.get("password"),
    };

    login.mutate(user);
  }

  function handleLoginSuccess(response) {
    try {
      const tokens = response.data;
      if (checkAdminRole(tokens.accessToken)) {
        saveTokens(tokens);
        setIsAdminAuth(true);
        navigate("/admin/articles");
      }
    } catch (err) {
      console.log(err);
    }
  }

  if (isAdminAuth) return <Navigate to={"/admin/articles"} />;

  return (
    <StyledAdminAuthPage>
      <AdminHeader />
      <AdminSignIn>
        <SignInForm reference={formRef} />
        <LoginButton onClick={handleSignIn}>Войти</LoginButton>
      </AdminSignIn>
    </StyledAdminAuthPage>
  );
}

export default AdminAuthPage;
