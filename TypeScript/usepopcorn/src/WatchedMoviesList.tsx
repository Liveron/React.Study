import WatchedMovie from "./WatchedMovie";
import WatchedModel from "./models/WatchedModel";

type WatchedMoviesListProps = {
  watched: WatchedModel[];
  onDeleteWatched: (id: string) => void;
};

export default function WatchedMoviesList({
  watched,
  onDeleteWatched,
}: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}
