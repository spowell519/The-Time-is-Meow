import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer'

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  user: userReducer,
  cart: cartReducer,
})

export default appReducer;
