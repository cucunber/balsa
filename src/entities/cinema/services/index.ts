import { Api } from "shared/libs/api";
import { ICinemaDto } from "./type";
import { ICinema } from "../model";

export class CinemaService {
  constructor(private api: Api) {}

  async getCinemas(): PromiseRequestData<ICinemaDto[]> {
    try {
      const { data } = await this.api.get<ICinemaDto[]>("/cinema");
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }

  async getCinemaById(id: ICinema["id"]): PromiseRequestData<ICinemaDto> {
    try {
      const { data } = await this.api.get<ICinemaDto>(`/cinema/${id}`);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
