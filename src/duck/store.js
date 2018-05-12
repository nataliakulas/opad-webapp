import {createStore} from 'redux';
import {combineReducers} from 'redux';

import {sessionReducer} from './reducers.js'


const rootReducer = combineReducers({
  sessionState: sessionReducer,
});

const store = createStore(rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
