import { IActorDto } from "shared/types/dto/actor";
import { ICountryDto } from "shared/types/dto/country";
import { IDirectorDto } from "shared/types/dto/director";
import { IGenreDto } from "shared/types/dto/genre";
import { ILanguageDto } from "shared/types/dto/language";
import { IProducerDto } from "shared/types/dto/producer";
import { IMovie } from "../model";

export interface IMovieDto {
  id: int;
  name: string;
  poster: Nullable<string>
  release_date: string;
  rating: string;
  duration: int;
  director: IDirectorDto;
  producer: IProducerDto;
  genre: IGenreDto[];
  actor: IActorDto[];
  country: ICountryDto[];
  language: ILanguageDto[];
}

export interface IGetMoviesParameters {
  search: string;
  genre: string;
  rating_from: string;
  rating_to: string;
  duration_from: string;
  duration_to: string;
}

export interface IMovieService {
  getMovies(parameters?: Partial<IGetMoviesParameters>): PromiseRequestData<IMovieDto[]>;
  getMovieById(id: IMovie["id"]): PromiseRequestData<IMovieDto>;
  getPopularMovies(): PromiseRequestData<IMovieDto[]>;
}
