import axios from 'axios';

// Action Types
export const FETCH_CAFES_REQUEST = 'FETCH_CAFES_REQUEST';
export const FETCH_CAFES_SUCCESS = 'FETCH_CAFES_SUCCESS';
export const FETCH_CAFES_FAILURE = 'FETCH_CAFES_FAILURE';

// Action Creators
export const fetchCafesRequest = () => {
  return {
    type: FETCH_CAFES_REQUEST
  };
};

export const fetchCafesSuccess = (cafes) => {
  return {
    type: FETCH_CAFES_SUCCESS,
    payload: cafes
  };
};

export const fetchCafesFailure = (error) => {
  return {
    type: FETCH_CAFES_FAILURE,
    payload: error
  };
};

// Thunk function to fetch cafes
export const fetchCafes = () => {
  return (dispatch) => {
    dispatch(fetchCafesRequest());

    axios.get('/cafes') // Replace with your API endpoint for fetching cafes
      .then(response => {
        const cafes = response.data;
        dispatch(fetchCafesSuccess(cafes));
      })
      .catch(error => {
        dispatch(fetchCafesFailure(error.message));
      });
  };
};

export const filterCafesByLocation = (location) => {
    return async (dispatch) => {
      dispatch({ type: 'FILTER_CAFES_REQUEST' });
  
      try {
        // Make an API request to filter cafes by location
        const response = await axios.get(`/cafes?location=${location}`);
  
        dispatch({
          type: 'FILTER_CAFES_SUCCESS',
          payload: response.data,
        });
      } catch (error) {
        dispatch({
          type: 'FILTER_CAFES_FAILURE',
          payload: error.message,
        });
      }
    };
  };