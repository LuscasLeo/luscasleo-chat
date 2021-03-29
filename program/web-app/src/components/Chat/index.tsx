import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootReducer } from '../../store';
import { addMessage } from '../../store/chat/chatReducer';
import {
  ChatContainer,
  ChatHistoryArea,
  ChatInput,
  ChatInputArea,
  ChatMessage,
} from './style';

const Chat: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const [messageValue, setMessageValue] = useState('');

  const { messages } = useSelector((state: RootReducer) => state.chat);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    dispatch(addMessage(messageValue));
    setMessageValue('');
  };

  return (
    <ChatContainer fluid>
      <ChatHistoryArea>
        {messages.map((message, index) => (
          <ChatMessage key={index}>
            <strong>
              [{message.timestamp.toLocaleTimeString()}] {message.username}:{' '}
            </strong>
            <span>{message.message}</span>
          </ChatMessage>
        ))}
      </ChatHistoryArea>
      <ChatInputArea>
        <form onSubmit={handleSubmit}>
          <ChatInput
            autoFocus
            onChange={(ev: ChangeEvent<HTMLInputElement>) =>
              setMessageValue(ev.target.value)
            }
            value={messageValue}
            placeholder="Type here..."
          />
        </form>
      </ChatInputArea>
    </ChatContainer>
  );
};
export default Chat;
