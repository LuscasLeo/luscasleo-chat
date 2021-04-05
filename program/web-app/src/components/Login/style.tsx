import { Container } from 'react-bootstrap';
import styled from 'styled-components';

export const LoginContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1em;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;
