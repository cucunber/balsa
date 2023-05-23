import {
  Box,
  Button,
  Grid,
  HStack,
  Heading,
  Input,
  VStack,
  Text,
  Divider,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { useMovie } from "entities/movie/api";
import { IGetMoviesParameters, IMovieDto } from "entities/movie/services/type";
import { MovieCard } from "features/movieCard/ui";
import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useMst } from "shared/hooks/useMst";
import { MultiSelect } from "chakra-multiselect";
import { IGenre } from "entities/genre/model";

const mapToOptions = (genres: IGenre[]) =>
  genres.map((genre) => ({ label: genre.name, value: genre.name }));

const genreToObject = (genres: IGenre[]) =>
  genres.reduce((obj, genre) => {
    obj[genre.id] = genre.name;
    return obj;
  }, {} as Record<IGenre["id"], IGenre["name"]>);

const genreToObject2 = (genres: IGenre[]) =>
  genres.reduce((obj, genre) => {
    obj[genre.name] = genre.id;
    return obj;
  }, {} as Record<IGenre["name"], IGenre["id"]>);

export const Search = observer(() => {
  const genres_ = useMst((state) => state.genres);
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchResult, setSearchResult] = useState<IMovieDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { searchMovies } = useMovie();

  const genres = useMemo(() => genreToObject(genres_), [genres_]);
  const genresNames = useMemo(() => genreToObject2(genres_), [genres_]);

  const { register, handleSubmit, control } = useForm({
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      rating_from: searchParams.get("rating_from") || "",
      rating_to: searchParams.get("rating_to") || "",
      duration_from: searchParams.has("duration_from")
        ? `${+searchParams.get("duration_from") / 60}`
        : "",
      duration_to: searchParams.has("duration_to")
        ? `${+searchParams.get("duration_to") / 60}`
        : "",
      genre:
        searchParams
          .get("genre")
          ?.split(",")
          .reduce(
            (arr, index) => (index in genres ? [...arr, genres[+index]] : arr),
            [] as string[]
          ) || [],
      search: searchParams.get("search") || "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    const searchObject = Object.fromEntries(
      Object.entries({
        ...data,
        duration_from: data.duration_from ? `${+data.duration_from * 60}` : "",
        duration_to: data.duration_to ? `${+data.duration_to * 60}` : "",
        genre: data.genre.map((genre) => genresNames[genre]).join(","),
      }).filter(([_, v]) => !!v)
    );
    const searchParams = new URLSearchParams(searchObject);
    setSearchParams(searchParams);
    searchMovies(searchObject as unknown as IGetMoviesParameters)
      .then(([error, data]) => {
        if (error) {
          setError(JSON.stringify(data));
        } else {
          setSearchResult(data);
        }
      })
      .finally(() => setLoading(false));
  });

  return (
    <VStack spacing={4} mb={10}>
      <VStack
        align="flex-start"
        sx={{ w: "100%" }}
        as="form"
        onSubmit={onSubmit}
      >
        <Heading size="lg">Поиск фильмов</Heading>
        <Box width="50%">
          <FormControl>
            <FormLabel>Название фильма</FormLabel>
            <Input {...register("search")} width="100%" />
          </FormControl>
        </Box>
        <Box my={4} width="100%">
          <Text>Список доступных фильтров</Text>
          <FormControl>
            <FormLabel>Жанры фильма</FormLabel>
            <Controller
              control={control}
              name="genre"
              render={({ field: { value, onChange, onBlur } }) => (
                <MultiSelect
                  options={mapToOptions(genres_)}
                  value={value}
                  onChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </FormControl>
          <HStack display={"inline-flex"}>
            <FormControl>
              <FormLabel>Рейтинг</FormLabel>
              <HStack spacing={2}>
                <Input
                  {...register("rating_from")}
                  sx={{ width: "80px" }}
                  type="number"
                  placeholder="от"
                />
                <Box>-</Box>
                <Input
                  {...register("rating_to")}
                  sx={{ width: "80px" }}
                  type="number"
                  placeholder="до"
                />
              </HStack>
            </FormControl>
            <FormControl>
              <FormLabel>Продолжительность</FormLabel>
              <HStack spacing={2}>
                <Input
                  {...register("duration_from")}
                  sx={{ width: "80px" }}
                  type="number"
                  placeholder="от"
                />
                <Box>-</Box>
                <Input
                  {...register("duration_to")}
                  sx={{ width: "80px" }}
                  type="number"
                  placeholder="до"
                />
              </HStack>
            </FormControl>
            <Button isLoading={loading} type="submit">
              Искать
            </Button>
          </HStack>
        </Box>
        <Divider />
      </VStack>
      {searchResult.length !== 0 ? (
        <Grid
          width="100%"
          gap={10}
          gridTemplateColumns="repeat(auto-fit, minmax(min-content, 250px))"
        >
          {searchResult.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              rating={+movie.rating}
              poster={movie.poster}
              title={movie.name}
              releaseDate={movie.release_date}
              genres={movie.genre}
            />
          ))}
        </Grid>
      ) : (
        <Text textAlign="center">
          Нажмите "Искать" или обновите фильтры поиска
        </Text>
      )}
    </VStack>
  );
});
