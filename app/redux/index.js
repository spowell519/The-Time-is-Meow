import { combineReducers } from 'redux';
import productsReducer from './productsReducer';
import productReducer from './productReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';
import cartReducer from './cartReducer'
import categoryReducer from './categoryReducer'

const appReducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  auth: authReducer,
  cart: cartReducer,
  categories: categoryReducer,
  user: userReducer,
})

export default appReducer;
