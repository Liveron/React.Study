import { useQuiz } from "../contexts/QuizContext";

export default function RestartButton() {
  const { restart } = useQuiz();

  return (
    <button className="btn btn-ui" onClick={restart}>
      Restart quiz
    </button>
  );
}
