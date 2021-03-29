import _ from 'lodash';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { RootState } from '../../store';
import { addMessage } from '../../store/chat/chatReducer';
import { signOut } from '../../store/login/loginReducer';
import {
  ChatContainer,
  ChatHistoryArea,
  ChatInput,
  ChatInputArea,
  ChatMessage,
  LogoutButton,
} from './style';

const Chat: React.FC<{}> = () => {
  const history = useHistory();
  //REDUX SETUP
  const dispatch = useDispatch();
  const { messages } = useSelector((state: RootState) => state.chat);
  const { username, isLogged } = useSelector((state: RootState) => state.login);

  useEffect(() => {
    if (!isLogged) history.push('/');
  }, [isLogged]);

  //CHAT SCROLLING
  const chatBottomRef = useRef<HTMLDivElement>(null);
  const [doScroll, setDoScroll] = useState(false);
  const debounceScrollRef = useRef(
    _.debounce(() => {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50)
  );
  const scrollToBottom = () => setDoScroll(true);

  //MESSAGE INPUT HANDLING
  const [messageValue, setMessageValue] = useState('');

  //WHEN SCROLL DISPATCHED
  useEffect(() => {
    if (doScroll) {
      debounceScrollRef.current();
      setDoScroll(false);
    }
  }, [doScroll]);

  //WHEN MESSAGE SUBMITTED
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!messageValue) return;
    dispatch(
      addMessage({
        message: messageValue,
        username,
      })
    );
    setMessageValue('');
    scrollToBottom();
  };

  return (
    <ChatContainer fluid>
      <LogoutButton onClick={() => dispatch(signOut())}>Sair</LogoutButton>
      <ChatHistoryArea>
        {messages.map((message, index) => (
          <ChatMessage key={index}>
            <strong>
              [{message.timestamp}] {message.username}:{' '}
            </strong>
            <span>{message.message}</span>
          </ChatMessage>
        ))}

        <div ref={chatBottomRef}></div>
      </ChatHistoryArea>
      <ChatInputArea onSubmit={handleSubmit}>
        <ChatInput
          autoFocus
          onChange={(ev: ChangeEvent<HTMLInputElement>) =>
            setMessageValue(ev.target.value)
          }
          value={messageValue}
          placeholder="Type here..."
        />
      </ChatInputArea>
    </ChatContainer>
  );
};
export default Chat;
