import axios from 'axios'

const TOKEN = 'token'
const CART = 'cart'
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const CHANGE_CART_STATUS = 'CHANGE_CART_STATUS'

//action

const _fetchCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
};

const _addToCart = (product) => {
  return {
    type: ADD_TO_CART,
    product
  }
}

const _changeStatus = (cart) => {
  return {
    type: CHANGE_CART_STATUS,
    cart
  }
};

//thunks

export const fetchCart = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  console.log('token:', token)
  if (token !== null) {
    const { data } = await axios.get('/api/cart', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(data))
  }
  else {
    let localCart = [];
    if (localStorage.getItem(CART)) {
      console.log('stuff in cart')
      localCart = JSON.parse(localStorage.getItem(CART));
    }
    console.log('local', localCart)
    return dispatch(_fetchCart(localCart))
  }
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
  const token = window.localStorage.getItem(TOKEN);
  const { data } = await axios.post('api/cart/addToCart', product, {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(data))

};

export const addProductToCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token !== null) {
    const { data } = await axios.post('/api/products/addToCart', product, {
      headers: {
        authorization: token
      }
    })
  }
  else {
    let localCart = [];
    if (localStorage.getItem(CART)) {
      console.log('stuff in cart')
      localCart = JSON.parse(localStorage.getItem(CART));
    }
    console.log('local', localCart)
    localCart.push(product)
    localStorage.setItem(CART, JSON.stringify(localCart));
  }
  return dispatch(_addToCart(product))
}

export const changeStatus = (cart) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const res = await axios.put('api/cart/createOrder', cart, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_changeStatus(res.data))
};

//reducer

export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

      case ADD_TO_CART:
      return [...state, action.product]

    case CHANGE_CART_STATUS:
      return action.cart

      default:
      return state
  }
}
