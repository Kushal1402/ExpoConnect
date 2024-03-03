import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

import Loadable from '../ui-component/Loadable';

const Form = Loadable(lazy(() => import('../view/Form')));

// Error Page
const NotFound = Loadable(lazy(() => import("../view/NotFound")));

export default function Index() {
    return useRoutes([
        {
            path: "/",
            element: <Form />
        },
        { path: "*", element: <NotFound /> },
    ])
}