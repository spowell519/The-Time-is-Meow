import axios from 'axios';

const GET_PRODUCTS = 'GET_PRODUCTS';

// actions

const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

// thunks

export const getProducts = (category) => {
  // later on filter by category
  return async (dispatch) => {
    const { data } = await axios.get('/api/products');
    dispatch(_getProducts(data))
  }
};

// reducers
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;
    default:
      return state;
  }
}
