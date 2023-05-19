import { Api } from "shared/libs/api";
import { IMovieService } from "./type";

export class SessionServices implements IMovieService {
  constructor(private api: Api) {}
  async getMovies(
    ...args: Parameters<IMovieService["getMovies"]>
  ): ReturnType<IMovieService["getMovies"]> {
    const [params] = args;
    try {
      const { data } = await this.api.instance.get("/sessions", { params });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
