import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {IMyBoard, type IBoard, type ICard, type ILabel} from "@/types/boardtypes";
import {cloneDeep} from "lodash";

interface BoardsState {
    myBoards: IMyBoard[];
    activeProjectId: number;
    activeBoardItem: IMyBoard | null;
    activeLabelFilter: ILabel | null;
}

const initialState: BoardsState = {
    myBoards: [],
    activeProjectId: 0,
    activeBoardItem: null,
    activeLabelFilter: null,
};

function extractLabels(boards: IBoard[]): ILabel[] {
    const all = boards.flatMap(board =>
        board.cards.flatMap(card => card.labels)
    );
    const unique: Record<string, ILabel> = {};
    all.forEach(lbl => {
        const key = `${lbl.text}::${lbl.color}`;
        if (!unique[key]) unique[key] = lbl;
    });
    return Object.values(unique);
}

const boardsSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        setProjectId: (state, action: PayloadAction<number>) => {
            const project = cloneDeep(state.myBoards)
                .find(b => b.id === action.payload) || null;
            if (project) {
                project.labels = extractLabels(project.boards);
            }
            return {
                ...state,
                activeProjectId: action.payload,
                activeBoardItem: project,
            };
        },

        addNewBoard: (state, action: PayloadAction<IBoard>) => {
            if (!state.activeBoardItem) return state;
            const newActive = {
                ...state.activeBoardItem,
                boards: [...state.activeBoardItem.boards, action.payload],
            };
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                activeBoardItem: newActive,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
            };
        },

        remove: (state, action: PayloadAction<number>) => {
            if (!state.activeBoardItem) return state;
            const newActive = {
                ...state.activeBoardItem,
                boards: state.activeBoardItem.boards.filter(b => b.id !== action.payload),
            };
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                activeBoardItem: newActive,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
            };
        },

        addNewCard: (state, action: PayloadAction<{ boardId: number; title: string }>) => {
            if (!state.activeBoardItem) return state;
            const newCard: ICard = {
                id: Date.now(),
                title: action.payload.title,
                labels: [],
                date: '',
                tasks: [],
                desc: '',
                comments: [],
            };
            const newBoards = state.activeBoardItem.boards.map(b =>
                b.id === action.payload.boardId
                    ? {...b, cards: [...b.cards, newCard]}
                    : b
            );
            const newActive = {...state.activeBoardItem, boards: newBoards};
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                activeBoardItem: newActive,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
            };
        },

        removeBoardCard: (state, action: PayloadAction<{ boardId: number; cardId: number }>) => {
            if (!state.activeBoardItem) return state;
            const newActive = cloneDeep(state.activeBoardItem);
            const target = newActive.boards.find(b => b.id === action.payload.boardId);
            if (target) {
                target.cards = target.cards.filter(c => c.id !== action.payload.cardId);
            }
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                activeBoardItem: newActive,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
            };
        },

        moveCard(state, action: PayloadAction<{
            fromBoardId: number;
            toBoardId: number;
            fromCardId: number;
            toCardId: number;
        }>) {
            if (!state.activeBoardItem) return state;
            const {fromBoardId, toBoardId, fromCardId, toCardId} = action.payload;
            const newActive = cloneDeep(state.activeBoardItem);
            const source = newActive.boards.find(b => b.id === fromBoardId);
            const target = newActive.boards.find(b => b.id === toBoardId);
            if (!source || !target) return state;
            const idx = source.cards.findIndex(c => c.id === fromCardId);
            if (idx < 0) return state;
            const [moved] = source.cards.splice(idx, 1);
            const insert = target.cards.findIndex(c => c.id === toCardId);
            if (insert < 0) target.cards.push(moved);
            else target.cards.splice(insert, 0, moved);
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
                activeBoardItem: newActive,
            };
        },

        setLabelFilter: (state, action: PayloadAction<ILabel | null>) => {
            state.activeLabelFilter = action.payload;
        },

        updateCard: (
            state,
            action: PayloadAction<{ boardId: number; cardId: number; card: ICard }>
        ) => {
            if (!state.activeBoardItem) return state;
            const {boardId, cardId, card} = action.payload;
            const newActive = cloneDeep(state.activeBoardItem);
            const target = newActive.boards.find(b => b.id === boardId);
            if (target) {
                target.cards = target.cards.map(c => c.id === cardId ? card : c);
            }
            newActive.labels = extractLabels(newActive.boards);
            return {
                ...state,
                activeBoardItem: newActive,
                myBoards: state.myBoards.map(p => p.id === newActive.id ? newActive : p),
            };
        },
    },
});

export const {
    setProjectId,
    addNewBoard,
    remove,
    addNewCard,
    removeBoardCard,
    moveCard,
    updateCard,
    setLabelFilter,
} = boardsSlice.actions;

export default boardsSlice.reducer;
