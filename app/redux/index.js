import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
})

export default appReducer;
