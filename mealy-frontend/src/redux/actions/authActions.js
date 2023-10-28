import axios from 'axios';

export const registerUser = (userData) => {
  return async (dispatch) => {
    try {
      const response = await axios.post('http://localhost:5000/api/users/register', userData);
      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: response.data 
      });
    } catch (error) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: error.response?.data
      });
    }
  };
};

export const getUserDetails = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/me'); // replace with your actual endpoint
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

// Adding the logoutUser action
export const logoutUser = () => {
  return (dispatch) => {
    // Clearing the user's authentication token and any other logout-related tasks can be done here
    // For now, I'm just dispatching a LOGOUT action
    dispatch({
      type: 'LOGOUT'
    });
  };
};
