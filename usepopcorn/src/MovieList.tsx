import { useState } from "react";
import { tempMovieData } from "./data/MoviesData";
import Movie from "./Movie";

export default function MovieList() {
  const [movies, setMovies] = useState(tempMovieData);

  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} />
      ))}
    </ul>
  );
}
