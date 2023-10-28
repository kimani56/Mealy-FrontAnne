import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';

// Importing components based on the new organized structure
import Dashboard from './components/Dashboard.js';
import Login from './components/Login.js';
import Register from './components/Register.js';
import Menu from './components/Menu.js';
import Orders from './components/Orders.js';

import NotFound from './components/NotFound.js';
import AdminDashboard from './components/AdminDashboard.js';
import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js';  // Ensure you have this component

// Importing Redux action
import { getUserDetails } from './redux/actions/authActions.js';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        
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
          <Route path="/signup" component={Register} />
          <Route path="/menu" component={Menu} />
          <Route path="/order-history" component={Orders} />
          <PrivateRoute path="/dashboard" component={AdminDashboard} role="caterer" />
          <Route path="/AdminDashboard" component={AdminDashboard} />
//       
          {/* If you have other Admin specific routes, you can add them here */}
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
