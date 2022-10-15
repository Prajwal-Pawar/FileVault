import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Notifications from './Notifications';

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
        navigate('/');
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
    <div>
      <div>
        <h1>Update Profile</h1>
        {/* when error, display error notification */}
        {error && <Notifications message={error} type="error" />}

        <form onSubmit={handleSubmit}>
          <span>
            <label>Email</label>
            <input
              type="email"
              ref={emailRef}
              defaultValue={currentUser.email}
              required
            />
          </span>
          <span>
            <label>Password</label>
            <input
              type="password"
              ref={passwordRef}
              placeholder="Leave blank to keep the same passwords"
            />
          </span>
          <span>
            <label>Confirm Password</label>
            <input
              type="password"
              ref={passwordConfirmRef}
              placeholder="Leave blank to keep the same passwords"
            />
          </span>
          {/* button is disabled when loading */}
          <button type="submit" disabled={loading}>
            Update Profile
          </button>
        </form>
      </div>
      <div>
        <Link to="/">Cancel</Link>
      </div>
    </div>
  );
};

export default UpdateProfile;
