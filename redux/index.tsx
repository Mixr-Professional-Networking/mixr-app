import { combineReducers, createStore } from 'redux';
import { updateLogin, updateMessages, updateMessageHistory } from './reducers';

const store = createStore(
  combineReducers({
    updateLogin,
    updateMessages,
    updateMessageHistory,
  })
);

export default store;
