import { combineReducers } from 'redux';
import productsReducer from './productsReducer';

const appReducer = combineReducers({
  products: productsReducer,
})

export default appReducer;
