import { Dispatch } from "react";
import Question from "../models/Question";
import { useQuiz } from "../contexts/QuizContext";

export default function Options() {
  const { questions, index, answer, newAnswer } = useQuiz();

  const question = questions[index];
  const hasAnswered = answer !== -1;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={answer !== -1}
          onClick={() => newAnswer(index)}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
