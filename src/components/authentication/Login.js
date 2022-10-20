import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
// semantic ui imports
import {
  Form,
  Button,
  Container,
  Grid,
  Message,
  Icon,
  Divider,
} from 'semantic-ui-react';

const Login = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();

  // using login from auth context
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch {
      setError('Failed to sign in, wrong username or password !');
    }

    setLoading(false);
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <h1>Login</h1>
            {/* when error, display error notification */}
            {error && <Message error header="Login Error" content={error} />}

            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input type="email" ref={emailRef} required />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
              </Form.Field>
              {/* button is disabled when loading */}
              <Button
                primary
                type="submit"
                loading={loading}
                disabled={loading}
                animated
              >
                <Button.Content visible>Login</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Form>

            {/* <Divider inverted /> */}
            <Divider horizontal> OR </Divider>

            <Link to="/forgot-password">Forgot Password ?</Link>
            <div>
              Dont Have an Account? <Link to="/signup">Sign Up</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Login;
