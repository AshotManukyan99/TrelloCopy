import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Checkbox, Modal, Progress, Space, Tag, Typography} from 'antd';
import {CheckSquare, List as ListIcon, Tag as TagIcon, Trash, Type} from 'react-feather';
import CustomInputAntdStyled from "@/components/CustomInput";
import {colorsList} from "@/helpers/Util";
import {ICard, ILabel, ITask} from "@/types/boardtypes";

const {Text} = Typography;

const StyledModal = styled(Modal)`
    .ant-modal-content {
        border-radius: 8px;
    }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 24px;
    max-width: 650px;
    min-width: 550px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

const TitleRow = styled(Space)`
    align-items: center;

    > svg {
        width: 18px;
        height: 18px;
    }

    > p {
        margin: 0;
        font-weight: bold;
        font-size: 18px;
    }
`;

const LabelsRow = styled(Space)`
    flex-wrap: wrap;
    gap: 8px;
`;

const ColorSwatches = styled.div`
    display: flex;
    gap: 12px;
    padding-left: 4px;

    > div {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
    }
`;

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`;

interface CardInfoProps {
    onClose: () => void;
    card: ICard;
    boardId: number;
    labels: ILabel[];
    updateCard: (boardId: number, cardId: number, card: ICard) => void;
}

const CardInfoAntdStyled: React.FC<CardInfoProps> = (props) => {
    const {onClose, card, boardId, updateCard, labels} = props;
    const [selectedColor, setSelectedColor] = useState<string>('');
    const [cardValues, setCardValues] = useState<ICard>({...card});

    useEffect(() => {
        updateCard(boardId, cardValues.id, cardValues);
    }, [cardValues]);

    const updateField = <K extends keyof ICard>(key: K, value: ICard[K]) => {
        setCardValues(prev => ({...prev, [key]: value}));
    };

    const addLabel = (label: ILabel) => {
        if (cardValues.labels.find(l => l.text === label.text)) return;
        setSelectedColor('');
        setCardValues(prev => ({...prev, labels: [...prev.labels, label]}));
        labels.push(label);
    };

    const removeLabel = (label: ILabel) =>
        setCardValues(prev => ({...prev, labels: prev.labels.filter(l => l.text !== label.text)}));

    const addTask = (value: string) => {
        const task: ITask = {id: Date.now(), text: value, completed: false};
        setCardValues(prev => ({...prev, tasks: [...prev.tasks, task]}));
    };

    const updateTask = (id: number, completed: boolean) =>
        setCardValues(prev => ({
            ...prev,
            tasks: prev.tasks.map(t => (t.id === id ? {...t, completed} : t)),
        }));

    const removeTask = (id: number) =>
        setCardValues(prev => ({...prev, tasks: prev.tasks.filter(t => t.id !== id)}));

    const calculatePercent = () =>
        cardValues.tasks.length
            ? (cardValues.tasks.filter(t => t.completed).length / cardValues.tasks.length) * 100
            : 0;

    const availableLabels = labels.filter(l => !cardValues.labels.some(cl => cl.text === l.text));

    return (
        <StyledModal open width={700} footer={null} onCancel={onClose}>
            <Container>
                <Section>
                    <TitleRow>
                        <Type/>
                        <p>Title</p>
                    </TitleRow>
                    <CustomInputAntdStyled
                        text={cardValues.title || 'Enter Title'}
                        defaultValue={cardValues.title}
                        onSubmit={value => updateField('title', value)}
                        buttonText={cardValues.title ? 'Update' : undefined}
                    />
                </Section>

                <Section>
                    <TitleRow>
                        <ListIcon/>
                        <p>Description</p>
                    </TitleRow>
                    <CustomInputAntdStyled
                        text={cardValues.desc || 'Add a Description'}
                        defaultValue={cardValues.desc}
                        onSubmit={value => updateField('desc', value)}
                        buttonText={cardValues.desc ? 'Update' : undefined}

                    />
                </Section>

                <Section>
                    <TitleRow>
                        <TagIcon/>
                        <p>Labels</p>
                    </TitleRow>
                    <LabelsRow>
                        {cardValues.labels.map((lbl, i) => (
                            <Tag key={i} color={lbl.color} closable onClose={() => removeLabel(lbl)}>
                                {lbl.text}
                            </Tag>
                        ))}
                    </LabelsRow>
                    <Text strong>Add Labels</Text>
                    <LabelsRow>
                        {availableLabels.map((lbl, i) => (
                            <Tag key={i} color={lbl.color} onClick={() => addLabel(lbl)}>
                                {lbl.text}
                            </Tag>
                        ))}
                    </LabelsRow>
                    <ColorSwatches>
                        {colorsList.map(color => (
                            <div
                                key={color}
                                style={{
                                    backgroundColor: color,
                                    border: selectedColor === color ? '2px solid red' : 'none'
                                }}
                                onClick={() => setSelectedColor(color)}
                            />
                        ))}
                    </ColorSwatches>
                    <CustomInputAntdStyled
                        text="+ Add"
                        placeholder="Enter label text"
                        onSubmit={value => addLabel({color: selectedColor, text: value})}
                    />
                </Section>

                <Section>
                    <TitleRow>
                        <CheckSquare/>
                        <p>Tasks</p>
                    </TitleRow>
                    <Progress percent={calculatePercent()} size="small"/>
                    <TaskList>
                        {cardValues.tasks.map(task => (
                            <Space key={task.id} align="center" style={{justifyContent: 'space-between'}}>
                                <Checkbox
                                    checked={task.completed}
                                    onChange={e => updateTask(task.id, e.target.checked)}
                                >
                                    {task.text}
                                </Checkbox>
                                <Button type="text" icon={<Trash/>} onClick={() => removeTask(task.id)}/>
                            </Space>
                        ))}
                        <CustomInputAntdStyled
                            text="Add New Task"
                            placeholder="Please add your new task"
                            onSubmit={addTask}
                        />
                    </TaskList>
                </Section>
            </Container>
        </StyledModal>
    );
}

export default CardInfoAntdStyled