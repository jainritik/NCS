import axios from 'axios';

// Action Types
export const FETCH_EMPLOYEES_REQUEST = 'FETCH_EMPLOYEES_REQUEST';
export const FETCH_EMPLOYEES_SUCCESS = 'FETCH_EMPLOYEES_SUCCESS';
export const FETCH_EMPLOYEES_FAILURE = 'FETCH_EMPLOYEES_FAILURE';

// Action Creators
export const fetchEmployeesRequest = () => {
  return {
    type: FETCH_EMPLOYEES_REQUEST
  };
};

export const fetchEmployeesSuccess = (employees) => {
  return {
    type: FETCH_EMPLOYEES_SUCCESS,
    payload: employees
  };
};

export const fetchEmployeesFailure = (error) => {
  return {
    type: FETCH_EMPLOYEES_FAILURE,
    payload: error
  };
};

// Thunk function to fetch employees
export const fetchEmployees = () => {
  return (dispatch) => {
    dispatch(fetchEmployeesRequest());

    axios.get('/employees')
      .then(response => {
        const employees = response.data;
        dispatch(fetchEmployeesSuccess(employees));
      })
      .catch(error => {
        dispatch(fetchEmployeesFailure(error.message));
      });
  };
};
