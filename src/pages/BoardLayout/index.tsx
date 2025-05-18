import React, {useEffect, useState} from 'react';
import {Outlet, useParams, useNavigate} from 'react-router-dom';
import {Layout} from 'antd';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import {IMyBoard, IRouteParam} from "@/types/boardtypes";
import {RootState, useAppDispatch, useAppSelector} from "@/store";
import {setProjectId} from "@/store/boardSlice";

const {Content} = Layout;
const defaultBgColor = 'rgb(0, 121, 191)';

const BoardLayout: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {boardId} = useParams() as unknown as IRouteParam;
    const [backgroundColor, setBackgroundColor] = useState<string>('');

    const {myBoards, activeProjectId} = useAppSelector((state: RootState) => state.board);

    const getSelectedMyBoard = (): IMyBoard | undefined =>
        myBoards.find((w) => w.id === Number(boardId))

    useEffect(() => {
        const selected = getSelectedMyBoard();
        setBackgroundColor(selected?.meta?.backgroundColor || defaultBgColor);
        dispatch(setProjectId((selected?.id || 1)))
    }, [myBoards, boardId]);

    useEffect(() => {
        // navigate for testing board
        navigate('/board/1')
    }, []);


    return (
        <Layout style={{height: '100%'}}>
            <Header bgColor={backgroundColor}/>
            <Layout style={{backgroundColor: backgroundColor}}>
                <Sidebar bgColor={backgroundColor} myBoards={myBoards}
                         selectedId={activeProjectId}/>
                <Content style={{margin: 0, padding: 24, overflow: 'auto'}}>
                    <Outlet/>
                </Content>
            </Layout>
        </Layout>
    );
}

export default BoardLayout;