import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../providers/AuthProvider';
// semantic ui imports
import { Button, Container, Grid, Message, Divider } from 'semantic-ui-react';

const Profile = () => {
  // hooks
  const [error, setError] = useState();
  const navigate = useNavigate();

  // get currentUser and logout from useAuth
  const { currentUser, logout } = useAuth();

  const handleLogout = async () => {
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to Log out !');
    }
  };

  return (
    <Container>
      <Grid>
        <Grid.Row centered>
          <Grid.Column width={6}>
            {error && <Message error header="Log OutError" content={error} />}
            <h1>Email : {currentUser.email}</h1>
            <Link to="/update-profile">Update Profile</Link>
            <Divider inverted />
            <Button onClick={handleLogout}>Log Out</Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
};

export default Profile;
