import { Api } from "shared/libs/api";
import { IProfileService, IUserDto } from "./type";

export class ProfileService implements IProfileService {
  constructor(private api: Api) {}
  async createProfile(
    ...params: Parameters<IProfileService["createProfile"]>
  ): ReturnType<IProfileService["createProfile"]> {
    try {
      const [user] = params;
      const { data } = await this.api.post("/auth/users/", user);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async getProfile(): ReturnType<IProfileService["getProfile"]> {
    try {
      const { data } = await this.api.get("/auth/users/me/");
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async updateProfile(
    ...params: Parameters<IProfileService["updateProfile"]>
  ): ReturnType<IProfileService["updateProfile"]> {
    try {
      const [profile] = params;
      const { data } = await this.api.patch("/auth/users/me/", profile);
      return [false, data];
    } catch (error) {
      return [true, error];
    }
  }
  async deleteProfile(): ReturnType<IProfileService["deleteProfile"]> {
    try {
      await this.api.delete("/auth/users/me/");
      return [false, true];
    } catch (error) {
      return [true, error];
    }
  }
}
