import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router';
import { signIn, validateToken } from '../../services/login';
import { useQuery } from '../../utils';
import { LoginContainer } from './style';
const Login: React.FC<{}> = () => {
  const history = useHistory();
  const query = useQuery();
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!!token) {
      setLogging(true);
      validateToken(token)
        .then(() => history.push('/chat'))
        .catch(() => {
          setLogging(false);
          localStorage.removeItem('token');
        });
    }

    const code = query.get('code');

    if (!code) return;
    signIn(code)
      .then((response) => {
        localStorage.setItem('token', response.token);
        history.push('/chat');
      })
      .catch(() => {
        setLogging(false);
      });
    history.replace('');
  }, []);
  return (
    <LoginContainer>
      <Button
        disabled={!!logging}
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
