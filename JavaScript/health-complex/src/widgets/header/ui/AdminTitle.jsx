import Title from "./Title";

function AdminTitle() {
  return (
    <Title
      leftText={
        <>
          {"Административная"}
          <br />
          {"Панель"}
        </>
      }
      rightText={"Наследие"}
    />
  );
}

export default AdminTitle;
