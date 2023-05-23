import { observer } from "mobx-react-lite";
import { IMovieCard } from "./type";
import {
  Card,
  CardBody,
  CardFooter,
  Stack,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import fallbackPoster from "shared/assets/img/poster.jpg";
import { Link } from "react-router-dom";
import { getLinkPath } from "shared/constants/routes";
import { MovieRating } from "shared/components/rating";

export const MovieCard = observer(
  ({ rating, title, poster, releaseDate, genres, id }: IMovieCard) => {
    const year = new Date(releaseDate).getFullYear();
    return (
      <Card
        size="sm"
        sx={{ width: "240px" }}
        as={Link}
        to={getLinkPath("movie.path", { id })}
      >
        <CardBody sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", top: 2, left: 2 }}>
            <MovieRating rating={rating} />
          </Box>
          <Image
            src={poster || fallbackPoster}
            fallbackSrc={fallbackPoster}
            alt={title}
            objectFit="cover"
            sx={{ width: "230px", height: "250px" }}
          />
        </CardBody>
        <CardFooter
          sx={{
            flexDirection: "column",
          }}
        >
          <Text>{title}</Text>
          <Stack display={"inline-flex"}>
            <Text fontSize="sm" as="span" mr={2}>
              {year}
            </Text>
            <Text fontSize="sm" as="span">{genres.map(({ name }) => name).join(",")}</Text>
          </Stack>
        </CardFooter>
      </Card>
    );
  }
);
