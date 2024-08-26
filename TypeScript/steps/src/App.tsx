import { ReactNode, useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return (
    <div>
      <Steps />
    </div>
  );
}

export function Steps() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  function handlePrevious() {
    if (step > 1) setStep((x) => x - 1);
  }

  function handleNext() {
    if (step < 3) setStep((x) => x + 1);
  }

  return (
    <>
      <button className="close" onClick={() => setIsOpen((x) => !x)}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage step={step}>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#7950f2" textColor="#fff" onClick={handlePrevious}>
              <span>👈</span> Previous
            </Button>
            <Button bgColor="#7950f2" textColor="#fff" onClick={handleNext}>
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

type StepMessageProps = {
  children: ReactNode;
  step: number;
};

function StepMessage({ children, step }: StepMessageProps) {
  return (
    <p className="message">
      <h3>Step {step}</h3>
      {children}
    </p>
  );
}

type ButtonProps = {
  children: ReactNode;
  textColor: string;
  bgColor: string;
  onClick: () => void;
};

function Button({ children, textColor, bgColor, onClick }: ButtonProps) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
