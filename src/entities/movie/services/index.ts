import { Api } from "shared/libs/api";
import { IMovieService } from "./type";

export class MovieServices implements IMovieService {
  constructor(private api: Api) {}
  async getMovies(): ReturnType<IMovieService["getMovies"]> {
    try {
      const { data } = await this.api.instance.get("/movie");
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async getMovieById(
    ...params: Parameters<IMovieService["getMovieById"]>
  ): ReturnType<IMovieService["getMovieById"]> {
    const [id] = params;
    try {
      const { data } = await this.api.instance.get(`/movie/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
