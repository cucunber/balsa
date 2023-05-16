import { IRoutes } from "pages/config";
import { Route } from "react-router";

function routesBuilder({ path, element, children }: IRoutes){
    const Element = element;
    return(
        <Route path={path} element={<Element />}>{children?.map((route) => routesBuilder(route))}</Route>
    )
}

export default routesBuilder;