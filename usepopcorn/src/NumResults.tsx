import MovieModel from "./models/MovieModel";

type NumResultsProps = {
  movies: MovieModel[];
};

export default function NumResults({ movies }: NumResultsProps) {
  return (
    <p className="num-results">
      Found <strong>{movies ? movies.length : "X"}</strong> results
    </p>
  );
}
