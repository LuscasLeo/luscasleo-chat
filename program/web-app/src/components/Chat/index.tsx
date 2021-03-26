import React from 'react';
import { FormControl } from 'react-bootstrap';
import {
  ChatContainer,
  ChatHistoryArea,
  ChatInput,
  ChatInputArea,
  ChatMessage,
} from './style';
const Chat: React.FC<{}> = () => {
  return (
    <ChatContainer fluid>
      <ChatHistoryArea>
        <ChatMessage>
          <strong>Lucas: </strong>
          <span>Hello World!</span>
        </ChatMessage>

        <ChatMessage>
          <strong>Lucas: </strong>
          <span>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsam eum
            quos doloremque iure perspiciatis velit rerum quas illo consequuntur
            magni cum impedit adipisci, nobis possimus, quo eaque, doloribus
            quam consectetur.!
          </span>
        </ChatMessage>
      </ChatHistoryArea>
      <ChatInputArea>
        <ChatInput placeholder="Type here..." />
      </ChatInputArea>
    </ChatContainer>
  );
};
export default Chat;
