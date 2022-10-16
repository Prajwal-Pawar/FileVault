import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
// semantic ui imports
import {
  Form,
  Button,
  Container,
  Grid,
  Icon,
  Message,
  Divider,
} from 'semantic-ui-react';

const Signup = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // using signup from auth context
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if password and confirm password dont match return an error
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match !');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/login');
    } catch {
      setError('Failed to create an account !');
    }

    setLoading(false);
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <h1>Sign Up</h1>
            {/* when error, display error notification */}
            {error && <Message error header="Sign Up Error" content={error} />}
            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input type="email" ref={emailRef} required />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input type="password" ref={passwordRef} required />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input type="password" ref={passwordConfirmRef} required />
              </Form.Field>
              {/* button is disabled when loading */}
              <Button primary type="submit" disabled={loading} animated>
                <Button.Content visible>Sign Up</Button.Content>
                <Button.Content hidden>
                  <Icon name="arrow right" />
                </Button.Content>
              </Button>
            </Form>

            {/* <Divider inverted /> */}
            <Divider horizontal> OR </Divider>

            <div>
              Already Have an Account? <Link to="/login">Login</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Signup;
