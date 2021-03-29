import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getStoredToken } from '../../services/login';
import { RootState } from '../../store';
import { trySignIn, validateLogin } from '../../store/login/login.reducer';
import { useQuery } from '../../utils';
import { LoginContainer } from './style';
const Login: React.FC<{}> = () => {
  const history = useHistory();
  const query = useQuery();

  const dispatch = useDispatch();
  const { isLogged, isLogging } = useSelector(
    (state: RootState) => state.login
  );

  useEffect(() => {
    if (isLogged) history.push('/chat');
  }, [isLogged]);

  useEffect(() => {
    const code = query.get('code');
    const storedToken = getStoredToken();
    if (!!code) dispatch(trySignIn(code));
    else if (!!storedToken) dispatch(validateLogin(storedToken));
  }, []);

  return (
    <LoginContainer>
      <Button
        disabled={isLogging || isLogged}
        as="a"
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_API_CLIENT}&redirect_url=${location.href}`}
        size="lg"
      >
        Sign in with GitHub <FontAwesomeIcon icon={faGithub} />
      </Button>
    </LoginContainer>
  );
};
export default Login;
