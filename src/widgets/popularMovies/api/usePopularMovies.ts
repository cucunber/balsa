import { usePopularMovies as usePopularMoviesAPI } from "features/popularMovies/process";
import { useEffect, useState } from "react";
import { IMovieDto } from "entities/movie/services/type";

export const usePopularMovies = () => {
  const { getPopularMovies } = usePopularMoviesAPI();
  const [popularMovies, setPopularMovies] = useState<IMovieDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getPopularMovies()
      .then(([isError, data]) => {
        if (isError) {
          setError(JSON.stringify(data));
        } else {
          setPopularMovies(data);
        }
      })
      .finally(() => setLoading(false));
  }, [getPopularMovies]);

  return { popularMovies, loading, error };
};
