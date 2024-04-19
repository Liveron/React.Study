import Movie from "./Movie";
import MovieModel from "./models/MovieModel";

type MovieListProps = {
  movies: MovieModel[];
};

export default function MovieList({ movies }: MovieListProps) {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
}
