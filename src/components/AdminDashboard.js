// src/components/AdminDashboard.js

import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/manage-meals">Manage Meals</Link></li>
        <li><Link to="/admin/set-menu">Set Menu for the Day</Link></li>
        <li><Link to="/admin/view-orders">View Orders</Link></li>
        <li><Link to="/admin/view-earnings">View Earnings</Link></li>
        <li><Link to="/admin/order-history">Order History</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
