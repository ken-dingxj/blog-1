import { combineReducers } from 'redux';
import todos from 'reducers/todos';
import filters from 'reducers/filters';
import postsByName from 'reducers/jsons';

const todoApp = combineReducers({
  todos,
  filters,
  postsByName
});

export default todoApp;