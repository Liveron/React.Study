import Logo from "./Logo";
import NumResults from "./NumResults";
import Search from "./Search";
import MovieModel from "./models/MovieModel";

export type NavBarProps = {
  movies?: MovieModel[];
};

export default function NavBar({ movies = [] }: NavBarProps) {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search />
      <NumResults movies={movies} />
    </nav>
  );
}
