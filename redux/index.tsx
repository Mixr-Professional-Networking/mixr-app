import { combineReducers, createStore } from 'redux';
import {
  updateLogin,
  updateMessages,
  updateMessageHistory,
  cardsReducer,
} from './reducers';

const store = createStore(
  combineReducers({
    updateLogin,
    updateMessages,
    updateMessageHistory,
    cardsReducer,
  })
);

export default store;
