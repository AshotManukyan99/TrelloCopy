import React from "react";
import {ROUTES} from "@/routes/routes.contants";

const CommonRoutes = {
    path: ROUTES.MAINTENANCE,
    element: <></>,
    children: [
        {
            path: "403",
            element: (<></>) as React.ReactNode,
        },
        {
            path: "500",
            element: (<></>) as React.ReactNode,
        },
        {
            path: "404",
            element: <></>,
        },
        {
            path: "coming-soon",
            element: (<></>) as React.ReactNode,
        },
    ],
};

export default CommonRoutes;
