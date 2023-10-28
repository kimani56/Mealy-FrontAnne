// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
// // Import loginUser action if you have it
// // import { loginUser } from 'path-to-your-actions-file';

// const Login = () => {
//   // State hooks for email, password, and errors.
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [errors, setErrors] = useState({});

//   // Hook to dispatch actions to the Redux store.
//   const dispatch = useDispatch();

//   // Hook to interact with the history object of the router.
//   const history = useHistory();

//   // Accessing the auth state from the Redux store.
//   const auth = useSelector((state) => state.auth);
//   // Extracting specific properties from the auth state.
//   const { isAuthenticated, error } = auth;

//   useEffect(() => {
//     // Check if the user is authenticated.
//     if (isAuthenticated) {
//       // Redirect to the appropriate dashboard based on the role.
//       if(auth.role === "admin") {
//           history.push('/admindashboard');
//       } else {
//           history.push('/userdashboard');
//       }
//     }

//     // Check if there are authentication errors.
//     if (error) {
//       // If there are errors, set them in the local state to display.
//       setErrors(error);
//     }
//   }, [isAuthenticated, error, history, auth.role]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     // Assuming loginUser is an action you have, or will have
//     // dispatch(loginUser({ email, password }));

//     // Temporary error setting
//     setErrors({ general: "Invalid credentials" });
//   };

//   return (
//     <div>
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <input
//             type="email"
//             placeholder="Email Address"
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//           />
//           {errors.email && <span>{errors.email}</span>}
//         </div>
//         <div>
//           <input
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//           />
//           {errors.password && <span>{errors.password}</span>}
//         </div>
//         {errors.general && <span>{errors.general}</span>}
//         <div>
//           <button type="submit">Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Removed useDispatch import
import { useHistory } from 'react-router-dom';

const Login = () => {
  // State hooks for email, password, and errors.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  // Hook to interact with the history object of the router.
  const history = useHistory();

  // Accessing the auth state from the Redux store.
  const auth = useSelector((state) => state.auth);
  // Extracting specific properties from the auth state.
  const { isAuthenticated, error } = auth;

  useEffect(() => {
    // Check if the user is authenticated.
    if (isAuthenticated) {
      // Redirect to the appropriate dashboard based on the role.
      if(auth.role === "admin") {
          history.push('/admindashboard');
      } else {
          history.push('/userdashboard');
      }
    }

    // Check if there are authentication errors.
    if (error) {
      // If there are errors, set them in the local state to display.
      setErrors(error);
    }
  }, [isAuthenticated, error, history, auth.role]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // If you need to dispatch an action, reintroduce useDispatch
    setErrors({ general: "Invalid credentials" });
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
