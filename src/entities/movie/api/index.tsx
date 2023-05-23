import { useCallback, useRef } from "react";
import { MovieServices } from "../services";
import { instance } from "shared/constants/api/instance";
import { IGetMoviesParameters } from "../services/type";

export const useMovie = () => {
  const moviesService = useRef(new MovieServices(instance));
  const searchMovies = useCallback(async (params: IGetMoviesParameters) => {
    const data = moviesService.current.getMovies(params);
    return data;
  }, []);
  const movieById = useCallback(async (id: string) => {
    const data = await moviesService.current.getMovieById(id);
    return data;
  }, []);
  return {
    searchMovies,
    movieById,
  };
};
