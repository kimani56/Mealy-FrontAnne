import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Dashboard from './components/Dashboard.js';
import UserLoginPage from './components/UserLoginPage.js'; // Ensure this import path is correct
import AdminLoginPage from './components/AdminLoginPage.js'; 
import Register from './components/Register.js';  // Import the Register component
import AdminDashboard from './components/AdminDashboard.js';
import Navbar from './components/Navbar.js';
import PrivateRoute from './components/PrivateRoute.js'; 
import MealList from './components/MealList.js';
import DayMenu from './components/DayMenu.js';
import Orders from './components/Orders.js';
// import Earnings from './components/Earnings.js';
import OrderItem from './components/OrderItem.js';
import NotFound from './components/NotFound.js';

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
          <Route path="/login-user" component={UserLoginPage} />
          <Route path="/login-admin" component={AdminLoginPage} />
          {/* <Route path="/login" component={Login} /> */}
          <Route path="/register" component={Register} />  // Route for the Register component
          <Route path="/admin-dashboard" component={AdminDashboard} />
          <PrivateRoute path="/dashboard" component={AdminDashboard} role="caterer" />
          
          <Route path="/meals" component={MealList} />
          <Route path="/menu" component={DayMenu} />
          <Route path="/orders" component={Orders} />
          {/* <Route path="/earnings" component={Earnings} /> */}
          <Route path="/history" component={OrderItem} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
