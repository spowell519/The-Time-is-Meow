import axios from 'axios';

const GET_PRODUCT = 'GET_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';

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

// thunks

export const getProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch(_getProduct(data))
  }
};

export const editProduct = (product) => {
  return async (dispatch) => {
    const { data } = await axios.put(`/api/products/${product.id}`, product);
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

    default:
      return state;
  }
}
