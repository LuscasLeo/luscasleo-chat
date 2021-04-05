import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { error } from 'console';
import React, { FormEvent, useEffect } from 'react';
import { Button, FormControl } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getStoredToken } from '../../services/login.service';
import { RootState } from '../../store';
import {
  trySignInWithGithub,
  validateLoginToken,
} from '../../store/login/login.reducer';
import { useQuery } from '../../utils';
import { LoginContainer, LoginForm } from './style';

interface LoginFormFields {
  username: string;
  password: string;
}

const Login: React.FC<{}> = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm<LoginFormFields>();

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
    if (!!code) dispatch(trySignInWithGithub(code));
    else if (!!storedToken) dispatch(validateLoginToken(storedToken));
  }, []);

  const handleSubmitLogin = handleSubmit((data, event) => {});

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmitLogin}>
        <FormControl
          placeholder="Username"
          type="text"
          {...register('username', {
            required: true,
          })}
        />

        {errors.username && <span>Username is required!</span>}
        <FormControl
          placeholder="password"
          type="password"
          {...register('password', {
            required: true,
          })}
        />
        {errors.password && <span>Password is required!</span>}
        <Button type="submit">Sign In</Button>
      </LoginForm>

      <span>or</span>
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
