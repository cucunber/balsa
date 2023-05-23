import { useEffect, useState } from "react";
import { IMovieDto } from "entities/movie/services/type";
import { useMoviesByGenre as useMoviesByGenreAPI } from "features/moviesByGenre/process";
import { IUseMovieByGenreProperties } from "./type";

export const useMoviesByGenre = ({ id }: IUseMovieByGenreProperties) => {
  const { getMoviesByGenre } = useMoviesByGenreAPI();
  const [movies, setPopularMovies] = useState<IMovieDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getMoviesByGenre({ genres: [id] })
      .then(([isError, data]) => {
        if (isError) {
          setError(JSON.stringify(data));
        } else {
          setPopularMovies(data);
        }
      })
      .finally(() => setLoading(false));
  }, [getMoviesByGenre, id]);

  return { movies, loading, error };
};
