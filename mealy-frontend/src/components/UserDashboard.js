// src/components/UserDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div>
      <h1>User Dashboard</h1>
      <ul>
        <li><Link to="/user/view-menu">View Today's Menu</Link></li>
        <li><Link to="/user/select-meal">Select Meal</Link></li>
        <li><Link to="/user/change-meal">Change Meal Choice</Link></li>
        <li><Link to="/user/order-history">View Order History</Link></li>
        <li><Link to="/user/profile">Profile</Link></li>  {/* Adding profile related links */}
        <li><Link to="/user/edit-profile">Edit Profile</Link></li>
      </ul>
    </div>
  );
};

export default UserDashboard;
