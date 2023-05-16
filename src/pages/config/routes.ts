import { LazyExoticComponent, lazy } from "react";

export interface IRoutes {
    path: string,
    element: LazyExoticComponent<any> | ((properties: any) => JSX.Element);
    children?: IRoutes[];
}

const routes = {
    path: '/',
    element: lazy(() => import('../test'))
} satisfies IRoutes;

export default routes;