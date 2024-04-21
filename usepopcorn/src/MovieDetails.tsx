import { useEffect, useState } from "react";
import { API } from "./data/MoviesData";
import MovieDetailsModel from "./models/MovieDetailsModel";
import StarRating from "./StarRating/StarRating";
import Loader from "./Loader";
import WatchedModel from "./models/WatchedModel";

type MovieDetailsProps = {
  selectedId: string;
  watched: WatchedModel[];
  onCloseMovie: () => void;
  onAddWatched: (movie: WatchedModel) => void;
};

export default function MovieDetails({
  selectedId,
  watched,
  onCloseMovie,
  onAddWatched,
}: MovieDetailsProps) {
  const [movie, setMovie] = useState(new MovieDetailsModel());
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const thisWatched = watched.find((movie) => movie.imdbID === selectedId);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true);
      const response = await fetch(API + `&i=${selectedId}`);
      const data = await response.json();

      setMovie(data);
      setIsLoading(false);
    }

    getMovieDetails();
  }, [selectedId]);

  function handleAdd() {
    const newWatchedMovie: WatchedModel = {
      imdbID: selectedId,
      imdbRating: Number(imdbRating),
      Year: year,
      Poster: poster,
      Title: title,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  }

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseMovie}>
              ⬅
            </button>
            <img src={poster} alt={`Poster of ${movie} movie`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!thisWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />

                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this movie {thisWatched?.userRating} <span>⭐</span>
                </p>
              )}
            </div>
            <p>
              <em>{plot}</em>
              <p>Starring {actors}</p>
              <p>Directed by {director}</p>
            </p>
          </section>
        </>
      )}
    </div>
  );
}
