import WatchedMovie from "./WatchedMovie";
import WatchedModel from "./models/WatchedModel";

type WatchedMoviesListProps = {
  watched: WatchedModel[];
};

export default function WatchedMoviesList({ watched }: WatchedMoviesListProps) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} />
      ))}
    </ul>
  );
}
