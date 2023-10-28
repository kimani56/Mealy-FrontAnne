// // src/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';
// import thunk from 'redux-thunk';
// import { createLogger } from 'redux-logger';

// // Import your slices here
// // import authReducer from './features/auth/authSlice';
// // import mealsReducer from './features/meals/mealsSlice';
// // import ordersReducer from './features/orders/ordersSlice';
// // ... any other slices

// const rootReducer = combineReducers({
//   // auth: authReducer,
//   // meals: mealsReducer,
//   // orders: ordersReducer,
//   // ... any other slice reducers
// });

// const middleware = [thunk];

// // Use the Redux logger in development environment only
// if (process.env.NODE_ENV === 'development') {
//   const logger = createLogger();
//   middleware.push(logger);
// }

// const store = configureStore({
//   reducer: rootReducer,
//   middleware, // Adding the middleware
//   devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
// });

// export default store;
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

// Import your reducers here
import authReducer from './reducers/authReducer';
import mealsReducer from './reducers/mealsReducer';
import ordersReducer from './reducers/ordersReducer';
import menuReducer from './reducers/menuReducer';
import notificationReducer from './reducers/notificationReducer'; // if you implement notifications

// Combine reducers
const reducer = {
  auth: authReducer,
  meals: mealsReducer,
  orders: ordersReducer,
  menu: menuReducer,
  notification: notificationReducer, // if you implement notifications
};

const middleware = [thunk];

// Use the Redux logger in development environment only
if (process.env.NODE_ENV === 'development') {
  const logger = createLogger();
  middleware.push(logger);
}

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
