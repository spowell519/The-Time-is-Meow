import axios from 'axios'

const TOKEN = 'token'
const USER = 'user'
const SET_CART = 'SET_CART'

//action

const _fetchCart = (cart) => {
  return {
    type: SET_CART,
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
  console.log('we got to thunk')
  const res = await axios.post('api/cart/removeFromCart', product, {
    headers: {
      authorization: token
    }
  })
  console.log('did we get through here? no :(')
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
}

//reducer

export default function productReducer(state={}, action) {
  switch(action.type) {
    case SET_CART:
      return action.cart
    default:
      return state
  }
}
