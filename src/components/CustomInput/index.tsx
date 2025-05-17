import React, { useState, FormEvent } from 'react'
import styled from 'styled-components'
import { Input, Button, Typography, Space } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const { Text } = Typography

const Container = styled.div`
  width: 100%;
`

const DisplayText = styled(Text)`
    padding: 6px 12px;
    border-radius: 3px;
    background-color: #eee;
    color: #000;
    cursor: pointer;
    display: inline-block;
    transition: background-color 200ms;

    &:hover {
        background-color: #ddd;
    }
`

const EditContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #fff;
  padding: 15px;
  border-radius: 8px;
`

const StyledInput = styled(Input)`
  border: 2px solid #0079bf;
  border-radius: 3px;
  font-size: 14px;
  padding: 6px;
`

const Footer = styled(Space)`
  display: flex;
  align-items: center;
  gap: 8px;
`

const SubmitButton = styled(Button).attrs({ type: 'primary' })``

const CloseButton = styled(Button).attrs({ type: 'text', icon: <CloseOutlined /> })``

interface CustomInputProps {
  text: string
  onSubmit: (value: string) => void
  placeholder?: string
  defaultValue?: string
  buttonText?: string
}

const CustomInputAntdStyled: React.FC<CustomInputProps> = ({
  text,
  onSubmit,
  placeholder,
  defaultValue = '',
  buttonText = 'Add',
}) => {
  const [editing, setEditing] = useState(false)
  const [value, setValue] = useState(defaultValue)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) {
      onSubmit(trimmed)
      setValue('')
      setEditing(false)
    }
  }

  const handleCancel = () => {
    setValue(defaultValue)
    setEditing(false)
  }

  return (
    <Container>
      {!editing ? (
        <DisplayText onClick={() => setEditing(true)}>
          {text}
        </DisplayText>
      ) : (
        <EditContainer onSubmit={handleSubmit}>
          <StyledInput
            value={value}
            placeholder={placeholder || text}
            onChange={e => setValue(e.target.value)}
            onPressEnter={handleSubmit}
            autoFocus
          />
          <Footer>
            <SubmitButton htmlType="submit">{buttonText}</SubmitButton>
            <CloseButton onClick={handleCancel} />
          </Footer>
        </EditContainer>
      )}
    </Container>
  )
}

export default CustomInputAntdStyled