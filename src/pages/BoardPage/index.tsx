import React, { useState } from 'react';
import { Col, message, Row, Select, Space } from 'antd';
import styled from 'styled-components';
import type { IBoard, ICard, ILabel } from '@/types/boardtypes';
import Board from '@/components/Board';
import CustomInputAntdStyled from '@/components/CustomInput';
import { RootState, useAppDispatch, useAppSelector } from '@/store';
import {
  addNewBoard,
  addNewCard,
  moveCard,
  remove,
  removeBoardCard,
  updateCard,
  setLabelFilter,
} from '@/store/boardSlice';

const LastBoardCol = styled(Col)`
  flex: 0 0 290px;
  max-width: 290px;
`;

const BoardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { activeBoardItem, activeLabelFilter } = useAppSelector((state: RootState) => state.board);
  const boards: IBoard[] = activeBoardItem?.boards ?? [];
  const labelsList: ILabel[] = activeBoardItem?.labels ?? [];
  const [messageApi, contextHolder] = message.useMessage();

  const [targetCard, setTargetCard] = useState({ boardId: 0, cardId: 0 });
  const [dragStartTargetCard, setDragStartTargetCard] = useState({ boardId: 0, cardId: 0 });

  const addBoardHandler = (name: string) => {
    const newBoard: IBoard = { id: Date.now(), title: name, cards: [] };
    dispatch(addNewBoard(newBoard));
    messageApi.success(`New Board '${name}' added successfully!`);
  };

  const removeBoard = (boardId: number) => {
    dispatch(remove(boardId));
    messageApi.success('Board removed successfully!');
  };

  const addCardHandler = (boardId: number, title: string) => {
    dispatch(addNewCard({ boardId, title }));
    messageApi.success('Task added successfully!');
  };

  const removeCard = (boardId: number, cardId: number) => {
    dispatch(removeBoardCard({ boardId, cardId }));
    messageApi.success('Card removed successfully!');
  };

  const updateBoardCard = (boardId: number, cardId: number, card: ICard) => {
    dispatch(updateCard({ boardId, cardId, card }));
  };

  const onDragStart = (boardId: number, cardId: number) => {
    setDragStartTargetCard({ boardId, cardId });
  };

  const onDragEnter = (boardId: number, cardId: number) => {
    setTargetCard({ boardId, cardId });
  };

  const onDragEnd = (_b: number, _c: number) => {
    const { boardId: fromBoardId, cardId: fromCardId } = dragStartTargetCard;
    const { boardId: toBoardId, cardId: toCardId } = targetCard;
    if ((fromBoardId === toBoardId && fromCardId === toCardId) || toBoardId === 0) {
      setDragStartTargetCard({ boardId: 0, cardId: 0 });
      setTargetCard({ boardId: 0, cardId: 0 });
      return;
    }
    dispatch(moveCard({ fromBoardId, toBoardId, fromCardId, toCardId }));
    setDragStartTargetCard({ boardId: 0, cardId: 0 });
    setTargetCard({ boardId: 0, cardId: 0 });
  };

  const filteredBoards = boards.map(b => ({
    ...b,
    cards: activeLabelFilter
      ? b.cards.filter(c =>
          c.labels.some(lbl =>
            lbl.text === activeLabelFilter.text && lbl.color === activeLabelFilter.color
          )
        )
      : b.cards,
  }));

  return (
    <>
      {contextHolder}
      <Space style={{ marginBottom: 16 }}>
        <Select
          placeholder="Filter by label"
          allowClear
          value={activeLabelFilter?.text}
          style={{ width: 200 }}
          onChange={(text) => {
            const lbl = labelsList.find(l => l.text === text) ?? null;
            dispatch(setLabelFilter(lbl));
          }}
        >
          {labelsList.map(l => (
            <Select.Option key={l.text} value={l.text}>
              <span style={{ color: l.color }}>{l.text}</span>
            </Select.Option>
          ))}
        </Select>
      </Space>
      <Row gutter={[16, 16]}>
        {filteredBoards.map(board => (
          <Col key={board.id} flex="290px">
            <Board
              board={board}
              labels={labelsList}
              addCard={addCardHandler}
              removeBoard={() => removeBoard(board.id)}
              removeCard={removeCard}
              updateCard={updateBoardCard}
              onDragStart={onDragStart}
              onDragEnter={onDragEnter}
              onDragEnd={onDragEnd}
            />
          </Col>
        ))}
        <LastBoardCol>
          <CustomInputAntdStyled
            text="+ Add Board"
            placeholder="Enter Board Name"
            onSubmit={addBoardHandler}
          />
        </LastBoardCol>
      </Row>
    </>
  );
};

export default BoardPage;
