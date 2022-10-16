import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
// semantic ui imports
import {
  Form,
  Button,
  Container,
  Grid,
  Message,
  Divider,
} from 'semantic-ui-react';

const ForgotPassword = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Refs
  const emailRef = useRef();

  // using resetPassword from auth context
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess('Email is sent to your email !');
    } catch {
      setError('Failed to reset password !');
    }

    setLoading(false);
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <h1>Reset Password</h1>
            {/* when error, display error notification */}
            {error && <Message error header="Error" content={error} />}
            {/* when success, display success notification */}
            {success && (
              <Message success header="Email Sent" content={success} />
            )}

            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input type="email" ref={emailRef} required />
              </Form.Field>
              {/* button is disabled when loading */}
              <Button type="submit" disabled={loading}>
                Reset Password
              </Button>
            </Form>

            <Divider inverted />

            <Link to="/login">Go Back to Login</Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default ForgotPassword;
