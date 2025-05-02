import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';
import DefaultLayout from '../../_theme/components/Layouts/DefaultLayout';
import BlankLayout from '../../_theme/components/Layouts/BlankLayout';

const finalRoutes = routes.map((route) => {
    return {
        ...route,
        element: route.layout === 'blank' ? <BlankLayout>{route.element}</BlankLayout> : <DefaultLayout>{route.element}</DefaultLayout>,
    };
});

const router = createBrowserRouter(finalRoutes);

export default router;
