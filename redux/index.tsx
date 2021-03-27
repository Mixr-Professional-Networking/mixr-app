import { combineReducers, createStore } from 'redux';
import {
  loginReducer,
  messagesReducer,
  messageHistoryReducer,
  cardsReducer,
} from './reducers';

const store = createStore(
  combineReducers({
    login: loginReducer,
    messages: messagesReducer,
    messageHistory: messageHistoryReducer,
    cards: cardsReducer,
  })
);

export default store;
