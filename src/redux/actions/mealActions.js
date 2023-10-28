// src/redux/actions/mealActions.js

export const FETCH_MEALS_REQUEST = 'FETCH_MEALS_REQUEST';
export const FETCH_MEALS_SUCCESS = 'FETCH_MEALS_SUCCESS';
export const FETCH_MEALS_FAILURE = 'FETCH_MEALS_FAILURE';

export const fetchMealsRequest = () => {
    return {
        type: FETCH_MEALS_REQUEST
    };
};

export const fetchMealsSuccess = (meals) => {
    return {
        type: FETCH_MEALS_SUCCESS,
        payload: meals
    };
};

export const fetchMealsFailure = (error) => {
    return {
        type: FETCH_MEALS_FAILURE,
        payload: error
    };
};

export const fetchMeals = () => {
    return (dispatch) => {
        dispatch(fetchMealsRequest());
        // Assuming an API endpoint exists to fetch meals.
        fetch('/api/meals')
            .then(response => response.json())
            .then(data => {
                dispatch(fetchMealsSuccess(data));
            })
            .catch(error => {
                dispatch(fetchMealsFailure(error.message));
            });
    };
};
