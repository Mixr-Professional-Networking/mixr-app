import { combineReducers, createStore } from 'redux';
import { updateLogin, updateMessages } from './reducers';

const store = createStore(
  combineReducers({
    updateLogin,
    updateMessages,
  })
);

export default store;
