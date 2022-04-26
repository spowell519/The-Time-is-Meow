import axios from 'axios'

const TOKEN = 'token'

const GET_ORDERS_ADMIN = 'GET_ORDERS_ADMIN';

const _getOrders = (orders) => {
  return {
    type: GET_ORDERS_ADMIN,
    orders
  }
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

export default function ordersAdminReducer(state = [], action) {
  switch (action.type) {
    case GET_ORDERS_ADMIN:
      return action.orders

    default:
      return state
  }
}
