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
  Divider,
} from 'semantic-ui-react';

const UpdateProfile = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Refs
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  // using currentUser, updateEmail, updatePassword from auth context
  const { currentUser, updateEmail, updatePassword } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    // if password and confirm password dont match return an error
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match !');
    }

    const promises = [];
    setLoading(true);
    setError('');

    // if email changes, then push new email to promises array
    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    // if password changes, then push new password to promises array
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        navigate('/user');
      })
      .catch(() => {
        setError('Failed to update profile !');
      })
      // finally runs whether we succeed or fail
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            <h1>Update Profile</h1>
            {/* when error, display error notification */}
            {error && <Message error header="Update Error" content={error} />}

            <Form onSubmit={handleSubmit}>
              <Form.Field>
                <label>Email</label>
                <input
                  type="email"
                  ref={emailRef}
                  defaultValue={currentUser.email}
                  required
                />
              </Form.Field>
              <Form.Field>
                <label>Password</label>
                <input
                  type="password"
                  ref={passwordRef}
                  placeholder="Leave blank to keep the same passwords"
                />
              </Form.Field>
              <Form.Field>
                <label>Confirm Password</label>
                <input
                  type="password"
                  ref={passwordConfirmRef}
                  placeholder="Leave blank to keep the same passwords"
                />
              </Form.Field>
              {/* button is disabled when loading */}
              <Button type="submit" disabled={loading}>
                Update Profile
              </Button>
            </Form>
            <Divider inverted />
            <div>
              <Link to="/">Cancel</Link>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default UpdateProfile;
