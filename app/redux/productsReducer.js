import axios from 'axios';
const TOKEN = 'token'

const GET_PRODUCTS = 'GET_PRODUCTS';
const FIND_PRODUCT = 'FIND_PRODUCT';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

// actions

const _getProducts = (products) => {
  return {
    type: GET_PRODUCTS,
    products
  }
};

export const findProduct = (id) => {
  return {
    type: FIND_PRODUCT,
    id
  }
}

const _addProduct = (product) => {
  return {
    type: ADD_PRODUCT,
    product
  }
};

const _editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  }
};


// thunks

export const getProducts = (category) => {
  return async (dispatch) => {
    const { data } = (!category)
      ? await axios.get('/api/products')
      : await axios.get(`/api/products/category/${category}`)
    dispatch(_getProducts(data))
  }
};

export const addProductToList = (product) => {
  const token = window.localStorage.getItem(TOKEN)

  return async (dispatch) => {
    const { data } = await axios.post('/api/products', product, {
      headers: {
        authorization: token,
      }
    });
    dispatch(_addProduct(data))
  }
};

export const editProductInList = (product) => {
  const token = window.localStorage.getItem(TOKEN)

  return async (dispatch) => {
    const { data } = await axios.put(`/api/products/${product.id}`, product, {
      headers: {
        authorization: token,
      }
    });
    dispatch(_editProduct(data))
  }
};

// reducer

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products;

    case FIND_PRODUCT:
      return state.find(product => product.id === action.id);

    case ADD_PRODUCT:
      return [...state, action.product];

    case EDIT_PRODUCT: {
      let products = state.filter(product => product.id !== action.product.id);
      products.push(action.product)
      return products;
    }

    default:
      return state;
  }
}
