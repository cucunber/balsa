import { Box, Heading, Stack } from "@chakra-ui/react";
import { useMst } from "shared/hooks/useMst";
import { PopularMovies } from "widgets/popularMovies/ui/slider";
import { observer } from "mobx-react-lite";
import { values } from "mobx";
import { MovieByGenre } from "widgets/moviesByGenre/ui/slider";
import { Search } from "widgets/search/ui";

const GenreSection = observer(() => {
  const genres = useMst((state) => state.genres);
  const mappedGenres = values(genres);
  if (mappedGenres.length === 0) {
    return null;
  }
  return (
    <>
      <Heading
        sx={{
          mt: 8,
          mb: 4
        }}
      >
        Фильмы по жанрам
      </Heading>
      <Stack flexDir="column" spacing={4}>
        {mappedGenres.map(({ name, id }) => (
          <MovieByGenre key={id} title={name} id={id} />
        ))}
      </Stack>
    </>
  );
});

const MainPage = () => {
  return (
    <Box sx={{
      p: [2, 4],
    }}>
      <Search />
      <PopularMovies />
      <GenreSection />
    </Box>
  );
};

export default MainPage;
