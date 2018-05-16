import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk'
import {sessionReducer, itemsReducer, pathReducer} from './reducers.js'


const rootReducer = combineReducers({
  sessionState: sessionReducer,
  itemsState: itemsReducer,
  pathState: pathReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunkMiddleware)
);

export default store;
