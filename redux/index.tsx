import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';

const composedEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

import {
  loginReducer,
  messagesReducer,
  messageHistoryReducer,
  cardsReducer,
} from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedLoginReducer = persistReducer(persistConfig, loginReducer);

const store = createStore(
  combineReducers({
    login: persistedLoginReducer,
    messages: messagesReducer,
    messageHistory: messageHistoryReducer,
    cards: cardsReducer,
  }), 
  composedEnhancer(applyMiddleware(
      thunk
  ))
);
const persistor = persistStore(store);

export { store, persistor };
