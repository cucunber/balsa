import { IActorDto } from "shared/types/dto/actor";
import { ICountryDto } from "shared/types/dto/country";
import { IDirectorDto } from "shared/types/dto/director";
import { IGenreDto } from "shared/types/dto/genre";
import { ILanguageDto } from "shared/types/dto/language";
import { IProducerDto } from "shared/types/dto/producer";
import { IMovie } from "../model";

export interface IMovieDto {
  id: int;
  release_date: string;
  rating: string;
  duration: int;
  director: IDirectorDto;
  producer: IProducerDto;
  genre: IGenreDto;
  actor: IActorDto;
  country: ICountryDto;
  language: ILanguageDto;
}

export interface IMovieService {
  getMovies(): PromiseRequestData<IMovieDto[]>;
  getMovieById(id: IMovie["id"]): PromiseRequestData<IMovieDto>;
}
