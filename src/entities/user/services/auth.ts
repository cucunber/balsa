import { Api } from "shared/libs/api";
import { IAuthService, ITokenPairDto, IVerifyToken } from "./type";
import { AxiosError } from "axios";

export class AuthService implements IAuthService {
  constructor(private api: Api) {}
  async createToken(
    ...params: Parameters<IAuthService["createToken"]>
  ): ReturnType<IAuthService["createToken"]> {
    try {
      const [pair] = params;
      const { data } = await this.api.post<ITokenPairDto>(
        "/auth/jwt/create/",
        pair
      );
      return [false, data];
    } catch (error: unknown) {
      return [true, (error as AxiosError).response?.data];
    }
  }
  async refreshToken(
    ...params: Parameters<IAuthService["refreshToken"]>
  ): ReturnType<IAuthService["refreshToken"]> {
    try {
      const [refresh] = params;
      const { data } = await this.api.post<ITokenPairDto>(
        "/auth/jwt/refresh/",
        refresh
      );
      return [false, data];
    } catch (error) {
      return [true, (error as AxiosError).response?.data];
    }
  }
  async verifyToken(
    ...params: Parameters<IAuthService["verifyToken"]>
  ): ReturnType<IAuthService["verifyToken"]> {
    try {
      const [token] = params;
      const { data } = await this.api.post<IVerifyToken>(
        "/auth/jwt/verify/",
        { token }
      );
      return [false, data];
    } catch (error) {
      return [true, (error as AxiosError).response?.data];
    }
  }
}
