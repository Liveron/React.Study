import Movie from "./Movie";
import MovieModel from "./models/MovieModel";

type MovieListProps = {
  movies: MovieModel[];
  onSelectMovie: (id: string) => void;
};

export default function MovieList({ movies, onSelectMovie }: MovieListProps) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelect={onSelectMovie} />
      ))}
    </ul>
  );
}
