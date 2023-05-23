import { instance } from "shared/constants/api/instance";
import { SessionServices } from "../services";
import { useCallback, useRef } from "react";
import { ISessionParameters } from "./type";

export const useSession = () => {
  const sessionService = useRef(new SessionServices(instance));
  const getSessions = useCallback(
    async (parameters: Partial<ISessionParameters>) => {
      const appliedParameters = Object.fromEntries(
        Object.entries(parameters).filter(([_, v]) => !!v)
      );
      const data = await sessionService.current.getSessions(appliedParameters);
      return data;
    },
    []
  );
  return {
    getSessions,
  };
};
