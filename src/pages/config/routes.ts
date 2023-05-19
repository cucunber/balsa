import { LazyExoticComponent, lazy } from "react";

export interface IRoutes {
  path: string;
  element: LazyExoticComponent<any> | ((properties: any) => JSX.Element);
  children?: IRoutes[];
}

const routes = {
  path: "/auth/*",
  element: lazy(() => import("../auth")),
} satisfies IRoutes;

export default routes;
