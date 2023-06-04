import { createStore, combineReducers } from 'redux';
import cafesReducer from './reducers/cafesReducer';
import employeesReducer from './reducers/employeesReducer';

const rootReducer = combineReducers({
  cafes: cafesReducer,
  employees: employeesReducer,
});

const store = createStore(rootReducer);

export default store;
