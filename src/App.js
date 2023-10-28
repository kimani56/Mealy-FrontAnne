import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import NotFound from './components/NotFound.js';
import AdminDashboard from './components/AdminDashboard.js';
import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js'; // Ensure you have this component

import { getUserDetails } from './redux/actions/authActions.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let token = null;
        const storedProfile = localStorage.getItem('profile');
        if (storedProfile) {
          token = JSON.parse(storedProfile).token;
        }

        // const token = JSON.parse(localStorage.getItem('profile')).token;

        // const token = localStorage.getItem('authToken');

        if (token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          dispatch(getUserDetails());
        }
      } catch (error) {
        console.error('Error fetching auth token from storage', error);
      }
    };

    fetchUserDetails();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <div>
        <Switch>
          <Route path="/" component={Dashboard} exact />
          <Route path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={AdminDashboard} role="caterer" />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
