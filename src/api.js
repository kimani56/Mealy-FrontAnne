import axios from 'axios';

// Create an Axios instance
const API = axios.create({
  baseURL: 'http://localhost:5000',

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
export const register = async (formData) => {
  const response = await API.post('/register', formData);
  alert('Registration successful');
  if (response.status === 409) {
    throw new Error('Username already exists');
  }
  return response;
};

export const googleAuth = () => API.get('/auth/google');
export const facebookAuth = () => API.get('/auth/facebook');
export const emailAuth = (formData) => API.post('/auth/email', formData);

// User Login
export const signIn = (formData) => API.post('/signIn', formData);

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

// Fetch menu for the day
export const fetchMenu = (caterer_id) => API.get('/menu', {params: { caterer_id }});

// Place an order
export const placeOrder = (orderData) => API.post('/order', orderData);

// Change meal choice (i.e., update the order)
export const updateOrder = (updatedOrderData) => API.put('/order', updatedOrderData);

// Fetch order history for a customer
export const fetchOrderHistory = (user_id) => API.get('/order/history', {params: { user_id }});

// export const fetchOrderHistory = (user_id) => API.get('/history', {params: { user_id }});

/* ------------------ Admin (Caterer) Specific Requests ------------------ */

// View all orders for the day
export const fetchTodaysOrders = (caterer_id) => API.get('/orders', {params: { caterer_id }});

// View total amount of money made by end of day
export const fetchTodaysEarnings = (caterer_id) => API.get('/earnings', {params: { caterer_id }});

// Export the API instance for global usage
export default API;
