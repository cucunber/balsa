import { ILanguageDto } from "./language";

export interface ICountryDto {
    id: int,
    name: string,
    language: ILanguageDto,
}