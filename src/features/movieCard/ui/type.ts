import { IGenreDto } from "shared/types/dto/genre";

export interface IMovieCard {
  id: number;
  rating: number;
  poster: Nullable<string>;
  title: string;
  releaseDate: string;
  genres: IGenreDto[];
}
