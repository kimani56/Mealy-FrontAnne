import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/register', userData);
    
      // Assuming the token is returned as part of the response data.
      localStorage.setItem('authToken', response.data.token);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data 
      });
    } catch (error) {
      if (error.response?.data?.message === 'Username already taken!') {

      // if (error.response?.data?.message === 'Username already exists') {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: { username: 'Username already exists' }
        });
      } else {
        dispatch({
          type: 'REGISTER_FAIL',
          payload: error.response?.data
        });
      }
    }
  };
};


export const getUserDetails = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('authToken')
        }
      });
      dispatch({
        type: 'FETCH_USER_DETAILS_SUCCESS',
        payload: response.data 
      });
    } catch (error) {
      dispatch({
        type: 'FETCH_USER_DETAILS_FAIL',
        payload: error.response?.data
      });
    }
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    // 1. Clear the user's authentication token from local storage.
    localStorage.removeItem('authToken');
    
    // 2. Dispatch the LOGOUT action to clear the user data from the Redux store.
    dispatch({
      type: 'LOGOUT'
    });
  };
};

