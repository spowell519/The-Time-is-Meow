import axios from 'axios'

const TOKEN = 'token'

const GET_ORDERS = 'GET_ORDERS';

const _getOrders = (orders) => {
  return {
    type: GET_ORDERS,
    orders
  }
}

export const getOrders = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const { data } = await axios.get('/api/orders/user', {
    headers: {
      authorization: token
    }
  })
  return dispatch(_getOrders(data))
}

export const getOrdersAdmin = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  const { data } = await axios.get('/api/orders/', {
    headers: {
      authorization: token
    }
  })
  return dispatch(_getOrders(data))
}

export default function ordersReducer(state = {}, action) {
  switch (action.type) {
    case GET_ORDERS:
      return action.orders

    default:
      return state
  }
}
