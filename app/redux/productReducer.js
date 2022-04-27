import axios from 'axios';
const TOKEN = 'token'

const GET_PRODUCT = 'GET_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const CLEAR_PRODUCT = 'CLEAR_PRODUCT';

// actions

const _getProduct = (product) => {
  return {
    type: GET_PRODUCT,
    product
  }
};

const _editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product
  }
};

export const _clearProduct = () => {
  return {
    type: CLEAR_PRODUCT,
  }
}

// thunks

export const getProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(_getProduct(data))
  }
};

export const editProduct = (product) => {
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

export default function productReducer(state = [], action) {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product;

    case EDIT_PRODUCT:
      return action.product;

    case CLEAR_PRODUCT:
      return []
    default:
      return state;
  }
}
