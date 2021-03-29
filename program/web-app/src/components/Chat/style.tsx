import { Button, Container, FormControl } from 'react-bootstrap';
import styled from 'styled-components';

export const ChatContainer = styled(Container)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
`;
export const ChatInputArea = styled.form`
  height: 4em;
`;

export const LogoutButton = styled(Button)`
  border: none;
  border-radius: 0;
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
  /* justify-content: flex-end; */
  overflow-y: scroll;
`;

export const ChatMessage = styled.div`
  padding-top: 1rem;
  display: flex;
  align-items: center;

  > strong {
    align-self: start;
    margin-right: 1rem;
    white-space: nowrap;
  }

  > span {
    min-width: 0;
    word-break: break-word;
  }

  &:first-child {
    margin-top: auto;
  }
`;
