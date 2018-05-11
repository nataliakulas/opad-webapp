import {createStore} from 'redux';
import {combineReducers} from 'redux';

import {sessionReducer, userReducer} from './reducers.js'


const rootReducer = combineReducers({
  sessionState: sessionReducer,
});

const store = createStore(rootReducer);

export default store;
