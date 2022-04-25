import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import cartReducer from './cartReducer'

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer
})

export default appReducer;
