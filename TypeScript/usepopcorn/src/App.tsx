import { useState } from "react";
import Main from "./Main";
import NavBar from "./NavBar";
import Search from "./Search";
import NumResults from "./NumResults";
import Box from "./Box";
import MovieList from "./MovieList";
import WatchedSummary from "./WatchedSummary";
import WatchedMoviesList from "./WatchedMoviesList";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import MovieDetails from "./MovieDetails";
import WatchedModel from "./models/WatchedModel";
import useMovies from "./hooks/useMovies";
import useLocalStorageState from "./hooks/useLocalStorageState";

export default function App() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const { movies, isLoading, error } = useMovies(query);

  const [watched, setWatched] = useLocalStorageState<WatchedModel[]>(
    [],
    "watched"
  );

  function handleSelectMovie(id: string) {
    setSelectedId((selectedId) => (id === selectedId ? "" : id));
  }

  function handleCloseMovie() {
    setSelectedId("");
  }

  function handleAddWatched(movie: WatchedModel) {
    setWatched((watched) => [...watched, movie]);
  }

  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              watched={watched}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
