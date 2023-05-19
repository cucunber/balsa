import { Api } from "shared/libs/api";

export const instance = new Api({
  baseURL: "http://localhost:8000/api/v1",
});
