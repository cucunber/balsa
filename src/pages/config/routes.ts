import { LazyExoticComponent, lazy } from "react";
import { routesPath } from "shared/constants/routes";

export interface IRoutes {
  path: string;
  element: LazyExoticComponent<any> | ((properties: any) => JSX.Element);
  children?: IRoutes[];
}

const routes = [
  {
    path: routesPath.auth.path,
    element: lazy(() => import("../auth")),
  },
  {
    path: routesPath.register.path,
    element: lazy(() => import("../register")),
  },
  {
    path: routesPath.main.path,
    element: lazy(() => import("../main")),
  },
  {
    path: routesPath.movie.path,
    element: lazy(() => import("../movie")),
  },
  {
    path: routesPath.sessions.path,
    element: lazy(() => import("../session")),
  },
  {
    path: routesPath.profile.path,
    element: lazy(() => import("../profile")),
  },
] satisfies IRoutes[];

export default routes;
