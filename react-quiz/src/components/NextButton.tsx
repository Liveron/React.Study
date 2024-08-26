import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { answer, index, numQuestions, nextQuestion, finish } = useQuiz();

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button className="btn btn-ui" onClick={nextQuestion}>
        Next
      </button>
    );

  return (
    <button className="btn btn-ui" onClick={finish}>
      Finish
    </button>
  );
}
