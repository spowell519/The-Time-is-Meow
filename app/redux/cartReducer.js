import axios from 'axios'

const TOKEN = 'token'
const SET_CART = 'SET_CART'
const CHANGE_CART_STATUS = 'CHANGE_CART_STATUS'
const CHECKOUT_CART = 'CHECKOUT_CART'

//action

const _fetchCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
};

const _changeStatus = (cart) => {
  return {
    type: CHANGE_CART_STATUS,
    cart
  }
};

const _checkoutCart = (cart) => {
  return {
    type: CHECKOUT_CART,
    cart
  }
}

//thunks

export const fetchCart = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.get('/api/cart', {
    headers: {
      authorization: token
    }
  })
  return dispatch(_fetchCart(res.data))
}

export const removeFromCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.post('api/cart/removeFromCart', product, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_fetchCart(res.data))
}

export const addToCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.post('api/cart/addToCart', product, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_fetchCart(res.data))
};

export const changeStatus = (cart) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.put('api/cart/createOrder', cart, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_changeStatus(res.data))
};

export const checkoutCart = (cart) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.post('/api/cart/create-checkout-session', cart, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_checkoutCart(res.data))
}

//reducer

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case CHANGE_CART_STATUS:
      return action.cart
    case CHECKOUT_CART:
      return action.cart
    default:
      return state
  }
}
