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
import { addMessage } from '../../store/chat/chat.reducer';
import { signOut } from '../../store/login/login.reducer';
import {
  setUpWebSocket,
  sendMessage,
} from '../../store/websocket/websocket.reducer';
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
  const { isOpen } = useSelector((state: RootState) => state.websocket);

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
    sendMessage(
      JSON.stringify({
        message: messageValue,
        sender: username,
      })
    );
    dispatch(
      addMessage({
        message: messageValue,
        sender: username,
      })
    );
    setMessageValue('');
    scrollToBottom();
  };

  return (
    <ChatContainer fluid>
      <LogoutButton onClick={() => dispatch(signOut())}>Sair</LogoutButton>
      <LogoutButton
        onClick={() => dispatch(setUpWebSocket('ws://localhost:3311'))}
      >
        Conexão ({isOpen ? 'Aberta' : 'Fechada'})
      </LogoutButton>
      <ChatHistoryArea>
        {messages.map((message, index) => (
          <ChatMessage key={index}>
            <strong>
              [{message.timestamp}] {message.sender}:{' '}
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
