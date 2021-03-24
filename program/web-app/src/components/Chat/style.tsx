import { Container, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

export const ChatContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
export const ChatInputArea = styled.div`
  height: 4em;
`;

export const ChatInput = styled(FormControl)`
  height: 100%;
  border-radius: 0;
  border: none;
  border-bottom: inherit;
  background-color: transparent !important;

  &:focus {
    box-shadow: 0 -0.4rem 0 0 rgb(0 123 255 / 25%) inset;
  }
`;

export const ChatHistoryArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export const ChatMessage = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;

  > strong {
    align-self: start;
    margin-right: 1rem;
  }
`;
