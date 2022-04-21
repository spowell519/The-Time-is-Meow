import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
  products: productsReducer,
  auth: authReducer
})

export default appReducer;
