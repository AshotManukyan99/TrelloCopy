import React, {lazy, Suspense} from 'react';
import {ROUTES} from '@/routes/routes.contants';

const BoardLayout = lazy(() => import('@/pages/BoardLayout'));
const BoardPage = lazy(() => import('@/pages/BoardPage'));

const MainRoutes = {
    path: '/',
    element: (
        <Suspense fallback={<div>Loading layout…</div>}>
            <BoardLayout/>
        </Suspense>
    ),
    children: [
        {
            path: ROUTES.BOARD,
            element: <BoardPage/>,
        },
        {
            path: '*',
            element: <>Page Not Found</>,
        },
    ],
};

export default MainRoutes;
