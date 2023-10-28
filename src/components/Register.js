// Necessary imports for the component.
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
// Import the action creator for the registration process.
import { registerUser } from '../redux/actions/authActions.js'; // Ensure this action is defined in your authActions file.

const Register = () => {
  // State hooks for registration fields and errors.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user');  // Hook for role
  const [errors, setErrors] = useState({});

  // Hook to dispatch actions to the Redux store.
  const dispatch = useDispatch();

  // Hook to interact with the history object of the router.
  const history = useHistory();

  // Accessing the auth state from the Redux store.
  const auth = useSelector((state) => state.auth);
  // Extracting specific properties from the auth state.
  const { isAuthenticated, error } = auth;

  // Effect hook to perform side effects when certain conditions are met.
  useEffect(() => {
    if (isAuthenticated) {
      // If registered (hence authenticated), redirect to the dashboard.
      history.push('/dashboard');
    }

    if (error) {
      // If there are errors, set them in the local state to display.
      setErrors(error);
    }
  }, [isAuthenticated, error, history]);

  // Handler for the form submission event.
  const handleSubmit = (e) => {
    e.preventDefault(); // Preventing default form submission behavior.

    if (password !== confirmPassword) {
      // Client-side password confirmation check.
      setErrors({ ...errors, confirmPassword: "Passwords don't match" });
      return;
    }

    // Creating a user data object from the input values.
    const newUser = {
      email,
      password,
      role  // Added role to the user data object
    };

    // Dispatching the registerUser action with the user data.
    dispatch(registerUser(newUser));
  };

  // JSX for the Register component.
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        {/* Input field for the email address. */}
        <div>
          <input
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            error={errors.email}
          />
          <span>{errors.email}</span>
        </div>
        {/* Input field for the password. */}
        <div>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            error={errors.password}
          />
          <span>{errors.password}</span>
        </div>
        {/* Input field for confirming the password. */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            error={errors.confirmPassword}
          />
          <span>{errors.confirmPassword}</span>
        </div>
        {/* Dropdown for selecting role */}
        <div>
          <label>
            Role:
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin/Caterer</option>
            </select>
          </label>
        </div>
        {/* Submit button for the form. */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

// Exporting the Register component to be used elsewhere.
export default Register;
