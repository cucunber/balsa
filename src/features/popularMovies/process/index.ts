import { MovieServices } from "entities/movie/services";
import { useCallback, useRef } from "react";
import { instance } from "shared/constants/api/instance";

export const usePopularMovies = () => {
  const movieService = useRef(new MovieServices(instance));
  const getPopularMovies = useCallback(async () => {
    const data = await movieService.current.getPopularMovies();
    return data;
  }, []);
  return {
    getPopularMovies,
  };
};
