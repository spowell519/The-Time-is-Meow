import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
})

export default appReducer;
