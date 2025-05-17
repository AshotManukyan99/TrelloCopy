export interface ILabel {
    color: string;
    text: string;
}

export interface ITask {
    id: number;
    completed: boolean;
    text: string;
}

export interface IComment {
    userName: string,
    date: Date;
    text: string;
}

export interface ICard {
    id: number;
    title: string;
    labels: ILabel[];
    date: string;
    tasks: ITask[];
    desc?: string;
    comments: IComment[]
}

export interface IBoard {
    id: number;
    title: string;
    cards: ICard[];
}

export interface IMyBoard {
    name: string;
    id: number;
    boards: IBoard[]
    meta: myBoardMeta | null,
    labels: ILabel[],
}

export interface myBoardMeta {
    backgroundColor: string;
}

export interface IRouteParam {
    boardId: string;
}

export interface ISideBarProps {
    myBoards: IMyBoard[];
    selectedId: number;
}
