import axios from 'axios'

const TOKEN = 'token'
const SET_CART = 'SET_CART'

//action

const _fetchCart = (cart) => {
  return {
    type: SET_CART,
    cart
  }
}

//thunk

export const fetchCart = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const {data} = await axios.get('/api/cart', {
    headers: {
      authorization: token
    }
  })
  return dispatch(_fetchCart)
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
