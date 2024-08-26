import { ReactNode } from "react";
import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";
import MovieModel from "./models/MovieModel";

type NavBarProps = {
  children: ReactNode;
};

export default function NavBar({ children }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}
