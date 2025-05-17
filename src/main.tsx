import React from 'react';
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import {Provider as ReduxProvider} from "react-redux";
import App from "@/App";
import {store} from "@/store";


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ReduxProvider store={store}>
                <App/>
            </ReduxProvider>
        </BrowserRouter>
    </StrictMode>
    ,
)
