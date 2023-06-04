const initialState = {
    employees: [],
  };
  
  const employeesReducer = (state = initialState, action) => {
    switch (action.type) {
      // Define your reducer logic and handle actions for employees state
      default:
        return state;
    }
  };
  
  export default employeesReducer;
  