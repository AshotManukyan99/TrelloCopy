import {useRoutes} from 'react-router-dom';

import AuthRoutes from "@/routes/AuthRoutes";
import MainRoutes from "@/routes/MainRoutes";
import CommonRoutes from "@/routes/CommonRoutes";


export default function ThemeRoutes() {
    return useRoutes([AuthRoutes, MainRoutes, CommonRoutes]);
}

