import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router';
import { checkLogin } from '../../services/login';
import { useQuery } from '../../utils';
import { LoginContainer } from './style';
const Login: React.FC<{}> = () => {
  const history = useHistory();
  const query = useQuery();

  useEffect(() => {
    const code = query.get('code');

    if (!code) return;

    checkLogin(code);
    history.replace('');
  }, []);
  return (
    <LoginContainer>
      <Button
        as="a"
        href={`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_API_CLIENT}&redirect_url=${location.href}`}
        size="lg"
      >
        Sign in with GitHub
        <FontAwesomeIcon icon={faGithub} />
      </Button>
    </LoginContainer>
  );
};
export default Login;
