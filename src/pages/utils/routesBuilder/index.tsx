import { IRoutes } from "pages/config";
import { Route } from "react-router";

function routesBuilder(routes: IRoutes[]) {
  return routes.map(({ path, element, children }) => {
    const Element = element;
    return (
      <Route key={path} path={path} element={<Element />}>
        {children && routesBuilder(children)}
      </Route>
    );
  });
}

export default routesBuilder;
