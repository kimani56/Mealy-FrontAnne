import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn } from '../api.js'; // Ensure this path is correct

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const { isAuthenticated, error } = auth;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      history.push(auth.role === "admin" ? '/admindashboard' : '/userdashboard');
    }

    if (error) {
      setErrors(error);
    }
  }, [isAuthenticated, error, history, auth.role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await signIn({ email, password }); // adjusted this line
      dispatch({ type: 'LOGIN_SUCCESS', payload: data });

      if (data.result.role === 'admin') {
        history.push('/admindashboard');
      } else {
        history.push('/userdashboard');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setErrors(error.response.data); // assuming the error format is consistent
      } else {
        // handle differently if the error structure isn't as expected
        setErrors({ general: 'An error occurred. Please try again.' });
      }
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          {errors.password && <span>{errors.password}</span>}
        </div>
        {errors.general && <span>{errors.general}</span>}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
