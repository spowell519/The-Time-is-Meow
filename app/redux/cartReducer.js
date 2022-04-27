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
  console.log('fetching cart')
  const token = window.localStorage.getItem(TOKEN)
  console.log('token:', token)
  if (token !== null) {
    const { data } = await axios.get('/api/cart', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(data.lineItems))
  }
  else {
    console.log('pull local cart')
    let localCart = [];
    if (localStorage.getItem(CART)) {
      console.log('stuff in cart')
      localCart = JSON.parse(localStorage.getItem(CART));
    }
    console.log('local', localCart)
    return dispatch(_fetchCart(localCart))
  }
}

//todo
export const removeFromCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.post('api/cart/removeFromCart', product, {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(res.data))
  }
  else {
    // find item in localstorage cart and decrement quantity/remove from list
    let localCart = [];
    if (localStorage.getItem(CART)) {
      localCart = JSON.parse(localStorage.getItem(CART));
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i].product.title === product.title) {
          (localCart[i].quantity > 1)
          ? localCart[i].quantity--
          : localCart.splice(i, 1)
        }
      }
      (localCart.length > 0)
      ? localStorage.setItem(CART, JSON.stringify(localCart))
      : localStorage.removeItem(CART)
    }
    return dispatch(_fetchCart(localCart))
  }
}
//todo check if state still ok for logged in
export const addToCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const { data } = await axios.post('api/cart/addToCart', product, {
        headers: {
          authorization: token
        }
      })
      return dispatch(_fetchCart(data))
  }
  else {
    // find item in localstorage cart and increment quantity
    let localCart = [];
    if (localStorage.getItem(CART)) {
      localCart = JSON.parse(localStorage.getItem(CART));
      let found = false;
      for (let i = 0; i < localCart.length; i++) {
        if (localCart[i].product.title === product.title) {
          localCart[i].quantity++;
          found = true
        }
      }
      if (!found) { // this should never happen
        console.log('i see you there messing with my data')
        localCart.push({quantity: 1, product: product})
      }
      localStorage.setItem(CART, JSON.stringify(localCart));
    }
    return dispatch(_fetchCart(localCart))
  }
};

export const addProductToCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token !== null) {
    const { data } = await axios.post('/api/products/addToCart', product, {
      headers: {
        authorization: token
      }
    })
    return dispatch(fetchCart(product))
  }
  else {
    let localCart = [];

    if (localStorage.getItem(CART)) {
      // load from local storage and add item or increase quantity
      localCart = JSON.parse(localStorage.getItem(CART));
      let found = false; // checking to see if item already there
      for (let i = 0; i < localCart.length; i++){
        if (localCart[i].product.title === product.title) {
          localCart[i].quantity++;
          found = true;
        }
      }
      if (!found) localCart.push({quantity: 1, product: product})
    }
    else { // add first item to local storage
      localCart.push({quantity: 1, product: product})
    }
    localStorage.setItem(CART, JSON.stringify(localCart));
    // change to action
    // return dispatch(fetchCart(localCart))
    return dispatch(_fetchCart(localCart))
  }
}

export const changeStatus = (cart) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  // also send total with rest of order
  const res = await axios.put('api/cart/createOrder', cart, {
    headers: {
      authorization: token
    }
  })
  return dispatch(_changeStatus(res.data))
};

//reducer

export default function productReducer(state = [], action) {
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
