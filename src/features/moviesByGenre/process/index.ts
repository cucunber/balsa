import { MovieServices } from "entities/movie/services"
import { useCallback, useRef } from "react"
import { instance } from "shared/constants/api/instance";
import { IGetByGenreProperties } from "./type";

export const useMoviesByGenre = () => {
    const movieService = useRef(new MovieServices(instance));
    const getMoviesByGenre = useCallback(({ genres }: IGetByGenreProperties) => {
        const genres_ = genres.join(',');
        const data = movieService.current.getMovies({ genre: genres_ });
        return data
    }, [])
    return {
        getMoviesByGenre
    }
}