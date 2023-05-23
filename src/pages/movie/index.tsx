import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useMovie } from "entities/movie/api";
import { IMovieDto } from "entities/movie/services/type";
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import posterFallback from "shared/assets/img/poster.jpg";
import { MovieRating } from "shared/components/rating";
import { getLinkPath } from "shared/constants/routes";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PersonAvatar } from "shared/components/person";
import { observer } from "mobx-react-lite";
import { useMst } from "shared/hooks/useMst";

const Movie = observer(() => {
  const [movie, setMovie] = useState<IMovieDto | null>(null);
  const { movieById } = useMovie();
  const { id } = useParams();
  const profile = useMst((state) => state.profile());

  useEffect(() => {
    const fetchInfo = async () => {
      if (!id) {
        return;
      }
      const [error, data] = await movieById(id);
      if (error) {
        return;
      }
      setMovie(data);
    };
    fetchInfo();
  }, [id, movieById]);

  const genreLink = (params?: string) =>
    `${getLinkPath("main.path")}${params && `?genre=${params}`}`;

  const ratingLink = (params?: string) =>
    `${getLinkPath("main.path")}${params && `?rating_from=${params}`}`;

  const durationLink = (params?: string) =>
    `${getLinkPath("main.path")}${params && `?duration_from=${params}`}`;

  const buyTicketLink = `${getLinkPath("sessions.path")}?movie_id=${id}`;

  if (!movie) {
    return null;
  }
  return (
    <HStack alignItems={"flex-start"} spacing={4} mt={4} p={4}>
      <Box flexBasis="30%" position="sticky" top="10px">
        <Image
          src={movie.poster || posterFallback}
          fallbackSrc={posterFallback}
          sx={{ width: "100%" }}
        />
        <Box mt={5}>
          {profile ? (
            <Button as={Link} to={buyTicketLink}>
              Купить билеты
            </Button>
          ) : (
            <Alert status="warning">
              <AlertIcon />
              <AlertTitle>
                Зайдите в личный кабинет, чтобы купить билет
              </AlertTitle>
            </Alert>
          )}
        </Box>
      </Box>
      <Box flexBasis={"auto"} flexGrow={1}>
        <VStack align={"initial"} spacing={4}>
          <Card>
            <CardHeader>
              <HStack alignItems={"center"}>
                <Heading size="lg">{movie.name}</Heading>
                <Link to={ratingLink(movie.rating)}>
                  <MovieRating rating={+movie.rating} />
                </Link>
              </HStack>
            </CardHeader>
            <CardBody>
              <Text>
                Дата выхода: {new Date(movie.release_date).toLocaleDateString()}
              </Text>
              <Text>
                Жанры:{" "}
                {movie.genre.map((genre, index, target) => (
                  <Fragment key={genre.id}>
                    <Link to={genreLink(`${genre.id}`)}>{genre.name}</Link>
                    {target.length - 1 !== index && ", "}
                  </Fragment>
                ))}
              </Text>
              <Text>
                Продолжительность:{" "}
                <Link to={durationLink(`${movie.duration}`)}>
                  {Math.ceil(movie.duration / 60)}
                </Link>{" "}
                мин
              </Text>
              <Text>
                Страна:{" "}
                {movie.country.map((element) => element.name).join(", ")}
              </Text>
              <Text>
                Язык: {movie.language.map((element) => element.name).join(", ")}
              </Text>
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Продюссер</Heading>
            </CardHeader>
            <CardBody>
              <PersonAvatar
                avatar={""}
                firstName={movie.producer.first_name}
                lastName={movie.producer.last_name}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Директор</Heading>
            </CardHeader>
            <CardBody>
              <PersonAvatar
                avatar={""}
                firstName={movie.director.first_name}
                lastName={movie.director.last_name}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <Heading size="md">Актеры</Heading>
            </CardHeader>
            <CardBody>
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={50}
                slidesPerView={5}
                navigation
                loop
              >
                {movie.actor.map((actor) => (
                  <SwiperSlide key={actor.id}>
                    <PersonAvatar
                      avatar={""}
                      firstName={actor.first_name}
                      lastName={actor.last_name}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </CardBody>
          </Card>
        </VStack>
      </Box>
    </HStack>
  );
});

export default Movie;
