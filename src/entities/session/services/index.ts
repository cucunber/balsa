import { Api } from "shared/libs/api";
import { ISessionService } from "./type";

export class SessionServices implements ISessionService {
  constructor(private api: Api) {}
  async getSessions(
    ...args: Parameters<ISessionService["getSessions"]>
  ): ReturnType<ISessionService["getSessions"]> {
    const [params] = args;
    try {
      const { data } = await this.api.instance.get("/sessions", { params });
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
}
