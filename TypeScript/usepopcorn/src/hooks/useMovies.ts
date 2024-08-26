import { useState, useEffect } from "react";
import MovieModel from "../models/MovieModel";
import { API } from "../data/MoviesData";

export default function useMovies(query: string) {
  const [movies, setMovies] = useState(Array<MovieModel>);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");

        const response = await fetch(API + `&s=${query}`, {
          signal: controller.signal,
        });

        if (!response.ok)
          throw new Error("Something went wrong with fetching movies");

        const data = await response.json();
        if (data.Response === "False") throw new Error("Movie not found");

        setMovies(data.Search);
        setError("");
      } catch (err) {
        const error = err as Error;
        console.log(error.message);

        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (!query) {
      setMovies([]);
      setError("");
      return;
    }
    fetchMovies();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}
