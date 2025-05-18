import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, type TypedUseSelectorHook} from 'react-redux';
import {APIMockData} from '@/mocks/data';
import boardSlice, {BoardsState} from "@/store/boardSlice";

const keyStorage = 'trello';

function loadMyBoards(): BoardsState['myBoards'] {
    try {
        const serialized = localStorage.getItem(keyStorage);
        if (serialized) {
            return JSON.parse(serialized) as BoardsState['myBoards'];
        }
        return [...APIMockData];
    } catch {
        return [...APIMockData];
    }
}

const preloadedState: { board: BoardsState } = {
    board: {
        myBoards: loadMyBoards(),
        activeProjectId: 0,
        activeBoardItem: null,
        activeLabelFilter: null
    },
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
        localStorage.setItem(keyStorage, JSON.stringify(myBoards));
    } catch (err) {
        console.error(err);
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

