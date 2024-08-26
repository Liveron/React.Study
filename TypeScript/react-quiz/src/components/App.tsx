import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import ErrorComp from "./ErrorComp";
import StartScreen from "./StartScreen";
import QuestionComp from "./QuestionComp";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorComp />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <QuestionComp />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
