import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';
import boardSlice from './boardSlice';
import {APIMockData} from "@/mocks/data";

const keyStorage = 'trello'

function loadMyBoards() {
    try {
        const serialized = localStorage.getItem(keyStorage);
        return serialized ? JSON.parse(serialized) : [];
    } catch {
        return [];
    }
}

const preloadedState = {
    board: {
        myBoards: loadMyBoards(),
        activeProjectId: 0,
        activeBoardItem: null,
    }
};

export const store = configureStore({
    reducer: {
        board: boardSlice,
    },
    preloadedState,
});

store.subscribe(() => {
    try {
        const {myBoards} = store.getState().board;


        localStorage.setItem(keyStorage, myBoards.length ?
            JSON.stringify(myBoards) : JSON.stringify(APIMockData));
    } catch (err) {
        console.error(err);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
