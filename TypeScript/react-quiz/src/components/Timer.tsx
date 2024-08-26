import { useEffect } from "react";
import { useQuiz } from "../contexts/QuizContext";

export default function Timer() {
  const { secondsRemaining, tick } = useQuiz();

  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [tick]);

  return (
    <div className="timer">
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
}
