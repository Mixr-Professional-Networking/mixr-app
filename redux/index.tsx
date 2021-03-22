import { combineReducers, createStore } from 'redux';
import { updateLogin } from './reducers';

const store = createStore(
  combineReducers({
    updateLogin,
  })
);

export default store;
