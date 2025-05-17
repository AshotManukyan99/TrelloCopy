import React, {useState} from 'react';
import styled, {css} from 'styled-components';
import type {MenuProps} from 'antd';
import {Card as AntdCard, Dropdown, Space, Tag, Typography} from 'antd';
import {
    AlignLeftOutlined,
    CheckSquareOutlined,
    ClockCircleOutlined,
    EllipsisOutlined,
    MessageOutlined
} from '@ant-design/icons';
import CardInfoAntdStyled from "@/components/CardInfo";
import {ICard, IComment, ILabel} from "@/types/boardtypes";
import {formatDate} from "@/helpers/Util";

const { Text } = Typography;

const Container = styled(AntdCard)<{ $dragState: string }>`
  .ant-card-body {
    padding: 10px;
  }

  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: rgb(0 0 0 / 9%) 0 9px 12px, rgb(0 0 0 / 6%) 0 6px 6px;
  cursor: pointer;

  ${({ $dragState }) =>
    $dragState === 'cardHold' && css`border: 1px solid #0279c0;`}
  ${({ $dragState }) =>
    $dragState === 'cardInvisible' && css`display: none;`}
  ${({ $dragState }) =>
    $dragState === 'cardHovered' && css`box-shadow: inset 0 0 0 2px #0279c0;`}
`;

const TopRow = styled(Space)`
  position: relative;
  width: 100%;
  justify-content: space-between;
  align-items: flex-start;
`;

const LabelGroup = styled(Space)`
  flex: 1;
  font-size: 10px;
  line-height: 12px;
  width: 50px;
`;

const MoreWrapper = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  justify-content: center;
  width: 30px;
  height: 20px;
  transform: translateX(15px);
  cursor: pointer;
  opacity: 0;
  transition: 200ms;

  ${Container}:hover & {
    opacity: 1;
  }
`;

const TitleText = styled(Text)`
  && {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.875rem;
  }
`;

const Footer = styled(Space)`
  width: 100%;
  align-items: center;
  display: flex;
  margin-top: 10px;
  gap: 20px;
`;

const FooterItem = styled.span`
  border-radius: 40px;
  padding: 8px;
  background-color: #f8f8f8;
  color: #000;
  display: flex;
  gap: 5px;
  align-items: center;
  font-size: 10px;
  line-height: 21px;
`;

interface CardProps {
  card: ICard;
  boardId: number;
  labels: ILabel[];
  comments: IComment[];
  removeCard: (boardId: number, cardId: number) => void;
  onDragStart: (boardId: number, cardId: number) => void;
  onDragEnter: (boardId: number, cardId: number) => void;
  onDragEnd: (boardId: number, cardId: number) => void;
  updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

const CardAntdStyled: React.FC<CardProps> = ({
  card,
  boardId,
  removeCard,
  onDragStart,
  onDragEnter,
  onDragEnd,
  updateCard,
  labels: labelList,
  comments,
}) => {
  const { id, title, desc, date, tasks, labels } = card;
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dragState, setDragState] = useState('');

  const menuItems: MenuProps['items'] = [
    {
      key: 'delete',
      label: 'Delete Card',
      onClick: () => {
        removeCard(boardId, id);
        setShowDropdown(false);
      },
    },
  ];

  return (
    <>
      {showModal && (
        <CardInfoAntdStyled
          onClose={() => setShowModal(false)}
          card={card}
          boardId={boardId}
          labels={labelList}
          updateCard={updateCard}
        />
      )}
      <Container
        $dragState={dragState}
        draggable
        onDragStart={() => {
          onDragStart(boardId, id);
          setDragState('cardHold');
          setTimeout(() => setDragState('cardInvisible'), 0);
        }}
        onDragEnd={() => {
          onDragEnd(boardId, id);
          setDragState('');
        }}
        onDragEnter={e => {
          e.preventDefault();
          onDragEnter(boardId, id);
          setDragState('cardHovered');
        }}
        onDragOver={e => {
          e.preventDefault();
        }}
        onDrop={e => {
          e.preventDefault();
          setDragState('');
        }}
        onClick={() => setShowModal(true)}
      >
        <TopRow align="start">
          <LabelGroup size={5} wrap>
            {labels.map((lbl, idx) => (
              <Tag key={idx} color={lbl.color}>{lbl.text}</Tag>
            ))}
          </LabelGroup>

          <Dropdown
            menu={{ items: menuItems }}
            trigger={['click']}
            open={showDropdown}
            onOpenChange={setShowDropdown}
          >
            <MoreWrapper
              onClick={e => {
                e.stopPropagation();
                setShowDropdown(true);
              }}
            >
              <EllipsisOutlined/>
            </MoreWrapper>
          </Dropdown>
        </TopRow>

        <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <TitleText>{title}</TitleText>
          <AlignLeftOutlined title={desc}/>
        </div>

        <Footer size="middle">
          {date && (
            <FooterItem>
              <ClockCircleOutlined/>
              <Text>{formatDate(date)}</Text>
            </FooterItem>
          )}
          {comments.length > 0 && <MessageOutlined/>}
          {tasks.length > 0 && <CheckSquareOutlined/>}
        </Footer>
      </Container>
    </>
  );
};

export default CardAntdStyled;
