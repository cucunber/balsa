import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import { MovieCard } from "features/movieCard/ui";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import { usePopularMovies } from "widgets/popularMovies/api/usePopularMovies";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const PopularMoviesSlider = () => {
  const { popularMovies, loading, error } = usePopularMovies();

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
      {popularMovies.map((movie) => (
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

export const PopularMovies = () => {
  return (
    <Stack direction="column">
      <Heading size="md">Популярные фильмы</Heading>
      <PopularMoviesSlider />
    </Stack>
  );
};
