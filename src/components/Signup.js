import React, { useRef, useState } from 'react';
import { useAuth } from '../providers/AuthProvider';
import Notifications from './Notifications';

const Signup = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
    } catch {
      setError('Failed to create an account');
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        <h1>Sign Up</h1>
        {/* when error, display error notification */}
        {error && <Notifications message={error} type="error" />}

        <form onSubmit={handleSubmit}>
          <span>
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </span>
          <span>
            <label>Password</label>
            <input type="password" ref={passwordRef} required />
          </span>
          <span>
            <label>Confirm Password</label>
            <input type="password" ref={passwordConfirmRef} required />
          </span>
          {/* button is disabled when loading */}
          <button type="submit" disabled={loading}>
            Sign Up
          </button>
        </form>
      </div>
      <div>Already Have an Account? Login</div>
    </div>
  );
};

export default Signup;
