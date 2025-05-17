import React from "react"
import {ROUTES} from "@/routes/routes.contants";
import BoardLayout from "@/pages/BoardLayout";
import BoardPage from "@/pages/BoardPage";

const MainRoutes = {
    path: "/",
    element: <BoardLayout/> as React.ReactNode,
    children: [
        {
            path: ROUTES.BOARD,
            element: <BoardPage/> as React.ReactNode,
        },
        {
            path: "*",
            element: <>Page Not Found</>,
        },
    ],
}

export default MainRoutes
