import Title from "widgets/header/ui/Title";
import InfoButton from "feature/information/InfoButton";
import styled from "styled-components";
import { useAuthContext } from "feature/user";
import HeaderLayout from "./HeaderLayout";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = styled.div`
  font-size: 3rem;
  color: var(--color-yellow-1);
  cursor: pointer;
`;

const Order = styled.div`
  font-size: 3rem;
  color: var(--color-yellow-1);
  cursor: pointer;
`;

function Header() {
  const { isAuth, enableForm } = useAuthContext();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isOrder = pathname.includes("order");

  return (
    <HeaderLayout
      left={<InfoButton />}
      center={<Title onClick={() => navigate("/")} />}
      right={
        isAuth ? (
          !isOrder && (
            <Order onClick={() => navigate("order/date")}>
              Заказать путевку
            </Order>
          )
        ) : (
          <Auth onClick={enableForm}>Авторизация</Auth>
        )
      }
    />
  );
}

export default Header;
