// src/api.js

import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000/api', // You should replace this URL with your Flask backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Set the AUTH token for any request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

/* ------------------ User/Auth Related Requests ------------------ */

// User Registration
export const signUp = (formData) => API.post('/user/signup', formData);

// User Login
export const signIn = (formData) => API.post('/user/signin', formData);

/* ------------------ Caterer Related Requests ------------------ */

// Fetch all caterers
export const fetchCaterers = () => API.get('/caterers');

// Fetch single caterer
export const fetchCaterer = (id) => API.get(`/caterers/${id}`);

// Caterer creating a meal
export const createMeal = (mealData) => API.post('/meals', mealData);

// Caterer updating a meal
export const updateMeal = (id, updatedMealData) => API.put(`/meals/${id}`, updatedMealData);

// Caterer deleting a meal
export const deleteMeal = (id) => API.delete(`/meals/${id}`);

// Caterer setting up the menu for the day
export const createMenu = (menuData) => API.post('/menu', menuData);

/* ------------------ Customer Related Requests ------------------ */

// Fetch menu for the day
export const fetchMenu = () => API.get(`/menu/today`);

// Place an order
export const placeOrder = (orderData) => API.post('/orders', orderData);

// Change meal choice (i.e., update the order)
export const updateOrder = (id, updatedOrderData) => API.put(`/orders/${id}`, updatedOrderData);

// Fetch order history for a customer
export const fetchOrderHistory = () => API.get('/orders/myorders');

/* ------------------ Admin (Caterer) Specific Requests ------------------ */

// View all orders for the day
export const fetchTodaysOrders = () => API.get('/orders/today');

// View total amount of money made by end of day
export const fetchTodaysEarnings = () => API.get('/earnings/today');

// Extra features can include endpoints for notifications, multiple caterers, etc.

// Export the API instance for global usage
export default API;
