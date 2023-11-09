// src/helpers/authHelper.js

export const saveToken = (token) => {
    localStorage.setItem('acess-token', token);
  };
  
  
  export const getToken = () => {
    return localStorage.getItem('access-token');
  };
 
  
  export const saveUserDetails = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
  };
  
  export const getUserDetails = () => {
    return JSON.parse(localStorage.getItem('user'));
  };
  
  export const clearAuthInfo = () => {
    localStorage.removeItem('acess-token');
    localStorage.removeItem('user');
  };
  