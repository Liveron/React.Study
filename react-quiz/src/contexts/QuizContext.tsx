import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";
import Question from "../models/Question";
import Action from "../actions/Action";

type State = {
  questions: Question[];
  status: string;
  index: number;
  answer: number;
  points: number;
  highScore: number;
  secondsRemaining: number;
};

const initialState: State = {
  questions: [],
  status: "loading",
  index: 0,
  answer: -1,
  points: 0,
  highScore: 0,
  secondsRemaining: 0,
};

const SecondsPerQuestion = 30;

function reducer(
  state: State,
  action: Action<string, Question[] | number>
): State {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: (action.payload as Question[]) || state.questions,
        status: "ready",
      };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SecondsPerQuestion,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload as number,
        points:
          (action.payload as number) === question?.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: -1 };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        highScore: state.highScore,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };

    default:
      throw new Error("Unknown action");
  }
}

type Context = State & {
  numQuestions: number;
  maxPoints: number;
  startQuiz: () => void;
  newAnswer: (index: number) => void;
  tick: () => void;
  nextQuestion: () => void;
  finish: () => void;
  restart: () => void;
};

const QuizContext = createContext<Context | undefined>(undefined);

type QuizProviderProps = {
  children: ReactNode;
};

export default function QuizProvider({ children }: QuizProviderProps) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  function startQuiz() {
    dispatch({ type: "start" });
  }

  function newAnswer(index: number) {
    dispatch({ type: "newAnswer", payload: index });
  }

  function tick() {
    dispatch({ type: "tick" });
  }

  function nextQuestion() {
    dispatch({ type: "nextQuestion" });
  }

  function finish() {
    dispatch({ type: "finish" });
  }

  function restart() {
    dispatch({ type: "restart" });
  }

  useEffect(() => {
    fetch("http://localhost:3000/questions")
      .then((response) => response.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch(() => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        numQuestions,
        status,
        index,
        answer,
        points,
        maxPoints,
        highScore,
        secondsRemaining,
        startQuiz,
        newAnswer,
        tick,
        nextQuestion,
        finish,
        restart,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside the QuizPropvider");
  return context;
}
