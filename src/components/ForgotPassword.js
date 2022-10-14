import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Notifications from './Notifications';

const ForgotPassword = () => {
  // hooks
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Refs
  const emailRef = useRef();

  // using login from auth context
  const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      <Notifications
        message="check your inbox for resetting password !"
        type="success"
      />;
    } catch {
      setError('Failed to reset password !');
    }

    setLoading(false);
  };

  return (
    <div>
      <div>
        <h1>Reset Password</h1>
        {/* when error, display error notification */}
        {error && <Notifications message={error} type="error" />}

        <form onSubmit={handleSubmit}>
          <span>
            <label>Email</label>
            <input type="email" ref={emailRef} required />
          </span>
          {/* button is disabled when loading */}
          <button type="submit" disabled={loading}>
            Reset Password
          </button>
        </form>
        <Link to="/login">Go Back to Login</Link>
      </div>
    </div>
  );
};

export default ForgotPassword;
