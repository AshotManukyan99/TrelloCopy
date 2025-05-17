import React, { useState } from 'react';
import styled from 'styled-components';
import { Card as AntdCard, Typography, Dropdown, Space, Button, type MenuProps } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import { IBoard, ICard, ILabel } from "@/types/boardtypes";
import CustomInputAntdStyled from "@/components/CustomInput";
import Card from "@/components/Card";

const { Text } = Typography;

const BoardContainer = styled.div`
  min-width: 290px;
  width: 290px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #17394d;
  flex: 0 0 290px;
`;

const BoardInner = styled(AntdCard)`
  background: rgba(223, 227, 230, 0.4);
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: none;
`;

const HeaderRow = styled(Space)`
  width: 100%;
  justify-content: space-between;
`;

const TitleText = styled(Text)`
  && {
    font-weight: bold;
    font-size: 15px;
    display: flex;
    gap: 5px;
    align-items: center;

    span {
      color: #ddd;
    }
  }
`;

const CardsContainer = styled.div`
  background: #f8f8f8;
  border-radius: 3px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 100%;
  overflow-y: auto;
`;

interface BoardProps {
  board: IBoard;
  labels: ILabel[];
  addCard: (boardId: number, title: string) => void;
  removeBoard: (boardId: number) => void;
  removeCard: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  onDragStart: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

const Board: React.FC<BoardProps> = ({
  board,
  labels,
  addCard,
  removeBoard,
  removeCard,
  onDragEnd,
  onDragEnter,
  onDragStart,
  updateCard,
}) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const menuItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: 'Delete Board',
      onClick: () => removeBoard(board.id),
    },
  ];

  return (
    <BoardContainer>
      <BoardInner
        size="small"
        onDragOver={e => e.preventDefault()}
        onDrop={e => {
          e.preventDefault();
          if (!board.cards.length) onDragEnd(board.id, -1);
        }}
      >
        <HeaderRow align="center">
          <TitleText>
            {board.title} <span>({board.cards.length})</span>
          </TitleText>
          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            open={menuVisible}
            onOpenChange={setMenuVisible}
          >
            <Button type="text" icon={<EllipsisOutlined />} />
          </Dropdown>
        </HeaderRow>

        <CardsContainer>
          {board.cards.map(card => (
            <Card
              key={card.id}
              card={card}
              labels={labels}
              boardId={board.id}
              removeCard={removeCard}
              updateCard={updateCard}
              onDragStart={() => onDragStart(board.id, card.id)}
              onDragEnter={() => onDragEnter(board.id, card.id)}
              onDragEnd={() => onDragEnd(board.id, card.id)}
              comments={card.comments}
            />
          ))}
          <CustomInputAntdStyled
            text="+ Add Card"
            placeholder="Enter Card Title"
            onSubmit={value => addCard(board.id, value)}
          />
        </CardsContainer>
      </BoardInner>
    </BoardContainer>
  );
};

export default Board;
