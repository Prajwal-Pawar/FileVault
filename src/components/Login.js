import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';
import Notifications from './Notifications';

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
    <div>
      <div>
        <h1>Login</h1>
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
          {/* button is disabled when loading */}
          <button type="submit" disabled={loading}>
            Login
          </button>
        </form>

        <Link to="/forgot-password">Forgot Password ?</Link>
      </div>
      <div>
        Dont Have an Account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
};

export default Login;
