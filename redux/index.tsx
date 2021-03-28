import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import AsyncStorage from '@react-native-community/async-storage';

import {
  loginReducer,
  messagesReducer,
  messageHistoryReducer,
  cardsReducer,
  expoPushTokenReducer,
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
    expoPushToken: expoPushTokenReducer,
  })
);
const persistor = persistStore(store);

export { store, persistor };
