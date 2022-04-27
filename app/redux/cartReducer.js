import axios from 'axios'

const TOKEN = 'token'
const CART = 'cart'
const SET_CART = 'SET_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
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

const _removeFromCart = (product) => {
  return {
    type: REMOVE_FROM_CART,
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
  if (token !== null) {
    const { data } = await axios.get('/api/cart', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(data.lineItems))
  }
  else {
    let localCart = [];
    if (localStorage.getItem(CART)) {
      localCart = JSON.parse(localStorage.getItem(CART));
    }
    console.log('local', localCart)
    return dispatch(_fetchCart(localCart))
  }
}

// called from authReducer to pull from localstorage
// and store cart items in a cart on server for user
export const fetchLocalCart = () => async dispatch => {
  console.log('dump localstorage into cart yah')
  const token = window.localStorage.getItem(TOKEN)
  let localCart = [];
  if (localStorage.getItem(CART)) {
    localCart = JSON.parse(localStorage.getItem(CART));
  }
  let cart = []
  for (let i = 0; i < localCart.length; i++) {
    console.log(`add ${localCart[i].product.title} to server`)
    let { data } = await axios.post('/api/cart/addToCart',
      localCart[i],
      {
      headers: {
        authorization: token
      }
    })
    cart = data.lineItems
  }
  console.log('trash localstorage')
  localStorage.removeItem(CART)
  return dispatch(_fetchCart(cart))
}

export const removeFromCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const { data } = await axios.post('api/cart/removeFromCart', product, {
      headers: {
        authorization: token
      }
    })
    return dispatch(_fetchCart(data.lineItems))
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
    return dispatch(fetchCart())
  }
}

export const addToCart = (product) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    console.log('product price', product.price)
    const { data } = await axios.post('/api/cart/addToCart', {product}, {
        headers: {
          authorization: token
        }
      })
      return dispatch(_fetchCart(data.lineItems))
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
      if (!found) localCart.push({quantity: 1, product: product})

    }
    else {// add first item to local storage
      localCart.push({quantity: 1, product: product})
    }
    localStorage.setItem(CART, JSON.stringify(localCart));
    return dispatch(_fetchCart(localCart))
  }
};

export const changeStatus = (history, total) => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const { data } = await axios.put('api/cart/createOrder', null, {
    headers: {
      authorization: token,
      total: total, // this should be sent somewhere else, but alas it's 2AM
    }
  })
  history.push('/checkout')
  // this ends up being a new cart
  // after the last one gets pushed to being an order
  return dispatch(_changeStatus(data))
};

//reducer

export default function productReducer(state = [], action) {
  switch (action.type) {
    case SET_CART:
      return action.cart

    case CHANGE_CART_STATUS:
      return action.cart

    default:
      return state
  }
}
