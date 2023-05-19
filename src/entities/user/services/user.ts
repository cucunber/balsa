import { Api } from "shared/libs/api";
import { IUserService } from "./type";

export class UserService implements IUserService {
  constructor(private api: Api) {}
  async getUsers(): ReturnType<IUserService["getUsers"]> {
    try {
      const { data } = await this.api.get("/auth/users/");
      return [null, data];
    } catch (error) {
      return [error, null];
    }
  }
  async getUserById(
    ...params: Parameters<IUserService["getUserById"]>
  ): ReturnType<IUserService["getUserById"]> {
    try {
      const [id] = params;
      const { data } = await this.api.get(`/auth/users/${id}/`);
      return [null, data];
    } catch (error) {
      return [error, null];
    }
  }
}
