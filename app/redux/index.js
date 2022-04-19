import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const appReducer = combineReducers({
  itemList: itemReducer,
})

export default appReducer;
