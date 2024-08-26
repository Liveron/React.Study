import Options from "./Options";
import { useQuiz } from "../contexts/QuizContext";

export default function QuestionComp() {
  const { questions, index } = useQuiz();
  const currentQuestion = questions[index].question;

  return (
    <div>
      <h4>{currentQuestion}</h4>
      <Options />
    </div>
  );
}
