import React from 'react'
import {Layout, Typography, Button, Space, List} from 'antd'
import {PlusOutlined, DeleteOutlined} from '@ant-design/icons'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import {IMyBoard} from '@/types/boardtypes'

const {Sider} = Layout
const {Title} = Typography

interface ISideBarProps {
    myBoards: IMyBoard[]
    selectedId: number
    bgColor?: string
    textColor?: string
    activeBg?: string
    hoverBg?: string
}

const SidebarContainer = styled(Sider)<{ $bgColor?: string; borderColor?: string }>`
    && {
        width: 250px;
        background-color: ${({$bgColor}) => $bgColor || '#056ba5'};
        backdrop-filter: blur(6px);
        border-right: 1px solid ${({borderColor}) => borderColor || 'hsla(0, 0%, 100%, 0.16)'};
        overflow-y: auto;
        height: calc(100vh - 44px);
    }
`

const HeaderSpace = styled(Space)`
    && {
        display: flex;
        justify-content: space-between;
        padding: 16px 12px;
    }
`

const StyledTitle = styled(Title)<{ textColor?: string }>`
    && {
        color: ${({textColor}) => textColor || '#FFFFFF'};
        margin: 0;
        flex: 1;
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
    }
`

const BoardListWrapper = styled.div`
    && .ant-list-item {
        padding: 0 20px;
        height: 32px;
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: background-color 85ms ease;
    }
`

const BoardListItem = styled(List.Item)<{
    selected?: boolean
    activeBg?: string
    hoverBg?: string
}>`
    && {
        background-color: ${({selected, activeBg}) =>
                selected ? activeBg || 'hsla(0,0%,100%,0.3)' : 'transparent'};

        &:hover {
            background-color: ${({hoverBg}) => hoverBg || 'hsla(0,0%,100%,0.16)'};
        }
    }
`

const BoardLink = styled(Link)<{ textColor?: string }>`
    flex: 1;
    color: ${({textColor}) => textColor || '#FFFFFF'};
    font-size: 14px;
    line-height: 20px;
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const IconButton = styled(Button).attrs({type: 'text'})<{ iconColor?: string }>`
    && {
        color: ${({iconColor}) => iconColor || '#FFFFFF'};
    }
`

const Sidebar: React.FC<ISideBarProps> = (
    {
        myBoards,
        selectedId,
        bgColor,
        textColor,
        activeBg,
        hoverBg,
    }) => (
    <SidebarContainer $bgColor={bgColor}>
        <HeaderSpace align="center">
            <StyledTitle level={4} ellipsis textColor={textColor}>
                My Works
            </StyledTitle>
            <IconButton icon={<PlusOutlined/>} iconColor={textColor}/>
        </HeaderSpace>

        <BoardListWrapper>
            <List
                itemLayout="horizontal"
                dataSource={myBoards}
                renderItem={(item: IMyBoard) => (
                    <BoardListItem
                        selected={item.id === selectedId}
                        activeBg={activeBg}
                        hoverBg={hoverBg}
                    >
                        <BoardLink to={`/board/${item.id}`} textColor={textColor}>
                            {item.name}
                        </BoardLink>
                        <IconButton icon={<DeleteOutlined/>} iconColor={textColor}/>
                    </BoardListItem>
                )}
            />
        </BoardListWrapper>
    </SidebarContainer>
)

export default Sidebar
