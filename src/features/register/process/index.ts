import { ProfileService } from "entities/user/services";
import { useCallback, useRef } from "react";
import { instance } from "shared/constants/api/instance";
import { ICreateUserDto } from "./type";

export const useRegister = () => {
  const profileService = useRef(new ProfileService(instance));
  const registerUser = useCallback(async (user: ICreateUserDto) => {
    const data = await profileService.current.createProfile(user);
    return data;
  }, []);
  return {
    registerUser,
  };
};
