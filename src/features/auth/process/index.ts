import { AuthService } from "entities/user/services";
import { useCallback, useRef } from "react";
import { instance } from "shared/constants/api/instance";
import { authKeys } from "shared/constants/localStorage";
import { authErrors } from "../constants/errors";
import { ITokenPairDto } from "entities/user/services/type";

const clearTokens = () => {
  localStorage.removeItem(authKeys.accessToken);
  localStorage.removeItem(authKeys.refreshToken);
};

const updateTokens = ({ access, refresh }: Partial<ITokenPairDto>) => {
  if (access) {
    localStorage.setItem(authKeys.accessToken, access);
  }
  if (refresh) {
    localStorage.setItem(authKeys.refreshToken, refresh);
  }
};

export const useAuth = () => {
  const authService = useRef(new AuthService(instance));

  const updateInterceptor = useCallback((tokens: ITokenPairDto) => {
    updateTokens(tokens);
    const createInterceptor = () => {
      instance.setRequestInterceptor(
        (config) => {
          config.headers.Authorization = `Bearer ${tokens.access}`;
          return config;
        },
        (error) => error
      );
      const interceptor = instance.setResponseInterceptor(
        (config) => config,
        (error) => {
          if (error.response.status !== 401) {
            return Promise.reject(error);
          }
          instance.setResponseEject(interceptor);
          return authService.current
            .refreshToken(tokens.refresh)
            .then(([error_, data]) => {
              if (error_) {
                clearTokens();
                return Promise.reject(data);
              }
              updateTokens(data);
              error.response.config.headers.Authorization = `Bearer ${data.access}`;
              return instance.instance(error.response.config);
            })
            .finally(createInterceptor);
        }
      );
    };
    createInterceptor();
  }, []);

  const authByToken = useCallback(async () => {
    const accessToken = localStorage.getItem(authKeys.accessToken);
    if (!accessToken) {
      return { error: authErrors["Empty access token"] };
    }
    const [error, data] = await authService.current.verifyToken(accessToken);
    if (error) {
      clearTokens();
      return { error: data };
    }
    return data;
  }, []);

  const authByPassword = useCallback(
    async (...params: Parameters<AuthService["createToken"]>) => {
      const [loginData] = params;
      const [error, data] = await authService.current.createToken(loginData);
      if (error) {
        return { error: data };
      }
      updateInterceptor(data);
      return data;
    },
    [updateInterceptor]
  );

  return {
    authByToken,
    authByPassword,
  };
};
