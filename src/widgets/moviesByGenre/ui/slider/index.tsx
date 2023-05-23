import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import { IMovieByGenre, IMovieSlider } from "./type";
import { useMoviesByGenre } from "widgets/moviesByGenre/api/useMovieByGenre";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { MovieCard } from "features/movieCard/ui";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const MovieSlider = ({ id }: IMovieSlider) => {
  const { movies, loading, error } = useMoviesByGenre({ id });

  if (loading) {
    return <Spinner />;
  }
  if (error) {
    return <Box>Ошибка загрузки</Box>;
  }
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={50}
      slidesPerView={5}
      navigation
      loop
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <MovieCard
            genres={movie.genre}
            releaseDate={movie.release_date}
            title={movie.name}
            id={movie.id}
            rating={parseFloat(movie.rating)}
            poster={movie.poster}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export const MovieByGenre = ({ title, id }: IMovieByGenre) => {
  return (
    <Stack>
      <Heading size="md">{title}</Heading>
      <MovieSlider id={id} />
    </Stack>
  );
};
