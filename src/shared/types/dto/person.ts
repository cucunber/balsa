import { ICountryDto } from "./country";
import { ILanguageDto } from "./language";

export interface IPersonDto {
  id: int;
  first_name: string;
  last_name: string;
  middle_name: Nullable<string>;
  country: ICountryDto[];
  language: ILanguageDto[];
}
