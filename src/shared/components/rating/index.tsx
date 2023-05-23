import { Box } from "@chakra-ui/react";
import { IMovieRating } from "./type";

const getColorSchemeByNumber = (num: number) => {
  if (num > 8) {
    return {
      background: "#2a9d8f",
      color: "#fff",
    };
  }
  if (num > 5) {
    return {
      background: "#e9c46a",
      color: "#fff",
    };
  }
  if (num > 3) {
    return {
      background: "#e76f51",
      color: "#fff",
    };
  }
  return {
    background: `url("/mihal-oscar-small.png") repeat 0 0`,
    backgroundSize: 'contain',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  }
};

export const MovieRating = ({ rating }: IMovieRating) => (
  <Box sx={{  px: 2, borderRadius: 2, ...getColorSchemeByNumber(rating) }}>
    {rating > 3 && rating}
  </Box>
);
