import { Api } from "shared/libs/api";
import { IGenreService } from "./type";

export class GenreService implements IGenreService {
  constructor(private api: Api) {}
  async getGenres(): ReturnType<IGenreService["getGenres"]> {
    try {
      const { data } = await this.api.get("/genre");
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
