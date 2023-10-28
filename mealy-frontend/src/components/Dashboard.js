import React from 'react';
import { useSelector } from 'react-redux';
import Login from './Login.js';
import Register from './Register.js';
import Menu from './Menu.js';
import MealList from './MealList.js';
import DayMenu from './DayMenu.js';

const Dashboard = () => {
  // Assuming you have a part of your Redux state named 'auth' with a property 'isAuthenticated'
  // Adjust this selector based on your actual Redux state structure
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  return (
    <div>
      <h1>Welcome to Mealy App</h1>
      <p>Your one-stop solution to order delicious meals!</p>

      {!isAuthenticated ? (
        <>
          <h2>Login</h2>
          <Login />

          <h2>Register</h2>
          <Register />
        </>
      ) : (
        <>
          <h2>Today's Menu</h2>
          <Menu />

          <h2>Available Meals</h2>
          <MealList />

          <h2>Select Meal for the Day</h2>
          <DayMenu />
        </>
      )}

      {/* Add other components as needed */}
    </div>
  );
};

export default Dashboard;
