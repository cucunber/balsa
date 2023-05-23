import { Api } from "shared/libs/api";
import { IMovieService } from "./type";

export class MovieServices implements IMovieService {
  constructor(private api: Api) {}
  async getMovies(
    ...args: Parameters<IMovieService["getMovies"]>
  ): ReturnType<IMovieService["getMovies"]> {
    const [params] = args;
    try {
      const { data } = await this.api.instance.get("/movie", {
        params,
      });
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
  async getPopularMovies(): ReturnType<IMovieService["getPopularMovies"]> {
    try {
      const { data } = await this.api.instance.get(`/movie/popular`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
