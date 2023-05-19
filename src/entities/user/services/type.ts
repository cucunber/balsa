export interface IUserDto {
  email: string;
  id: int;
  username: string;
}

export interface ITokenObtainPair {
  username: string;
  password: string;
}

export interface ITokenPairDto {
  refresh: string;
  access: string;
}

export interface ICreateUserBody {
  email: string;
  username: string;
  password: string;
}

export interface IVerifyToken {
  token: string;
}

export interface IAuthService {
  createToken(pair: ITokenObtainPair): PromiseRequestData<ITokenPairDto>;
  refreshToken(
    refresh: Pick<ITokenPairDto, "refresh">["refresh"]
  ): PromiseRequestData<ITokenPairDto>;
  verifyToken(
    token: Pick<ITokenPairDto, "access">["access"]
  ): PromiseRequestData<IVerifyToken>;
}

export interface IUserService {
  getUsers(): PromiseRequestData<IUserDto[]>;
  getUserById(id: IUserDto["id"]): PromiseRequestData<IUserDto>;
}

export interface IProfileService {
  createProfile(user: ICreateUserBody): PromiseRequestData<IUserDto>;
  getProfile(): PromiseRequestData<IUserDto>;
  updateProfile(profile: Partial<IUserDto>): PromiseRequestData<IUserDto>;
  deleteProfile(): PromiseRequestData<boolean>;
}
