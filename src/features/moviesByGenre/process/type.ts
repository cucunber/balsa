import { IGenreDto } from "shared/types/dto/genre";

export interface IGetByGenreProperties {
    genres: IGenreDto['id'][]
}