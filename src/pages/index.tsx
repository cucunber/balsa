import { Routes } from 'react-router';
import { routesBuilder } from './utils';
import { routes } from './config';

export const Routing = () => {
    return (
        <Routes>
            {routesBuilder(routes)}
        </Routes>
    )
}