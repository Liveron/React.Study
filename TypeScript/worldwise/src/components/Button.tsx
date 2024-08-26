import { ReactNode, MouseEvent } from "react";
import styles from "./Button.module.css";

type ButtonProps = {
  children: ReactNode;
  type?: string;
  onClick?: (e: MouseEvent) => void;
};

export default function Button({
  children,
  type = "",
  onClick = () => {},
}: ButtonProps) {
  return (
    <button
      onClick={(e) => onClick(e)}
      className={`${styles.btn} ${styles[type]}`}
    >
      {children}
    </button>
  );
}
