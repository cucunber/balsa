import { useRef, useCallback } from "react";
import { ProfileService } from "../services";
import { instance } from "shared/constants/api/instance";

export const useProfile = () => {
  const profileService = useRef(new ProfileService(instance));
  const getMe = useCallback(async () => {
    const data = await profileService.current.getProfile();
    return data;
  }, []);
  return {
    getMe,
  };
};
