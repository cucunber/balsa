import { IGenreDto } from "shared/types/dto/genre";

export interface IGenreService {
  getGenres(): PromiseRequestData<IGenreDto[]>;
}
